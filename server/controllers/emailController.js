const Filter = require('bad-words');
const filter = new Filter();
const { spawn } = require('child_process');



const isLink = (text) => {
  const pattern = /^(https?:\/\/[^\s]+|www\.[^\s]+)$/i;
  return pattern.test(text);
}


exports.getEmailDetails = async (req, res, next) => {
  try {

    // READING EMAIL FROM REQUEST BODY
    const emailContent = req.body.toString('utf-8');

    // CALCULATING EMAIL LENGTH
    const emailLength = emailContent.length;
    console.log("Length", emailLength);

    // CHECKING IF EMAIL CONTAINS LINKS
    let wordsList = emailContent.trim().split(/\s+/);
    //console.log(wordsList);
    let numLinks = 0;
    let containsLinks = false;
    wordsList.forEach(word => {
      if(isLink(word)){
        numLinks++;
        containsLinks = true;
        console.log(word);
      }
    });

    // CHECKING IF EMAIL CONTAINS BAD WORDS
    const containsBadWords = filter.isProfane(emailContent);

    const pythonInputArray = [emailLength, +containsLinks, +containsBadWords];
    console.log(pythonInputArray);

    // SPAWNING PYTHON PROCESS TO GET WHETHER EMAIL IS SPAM OR NOT
    const python = spawn('python', ['utils/email_fraud_detection.py']);
    let result = '';

    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.stderr.on('data', (err) => {
      console.error(`Python Error: ${err}`);
    });

    python.on('close', (code) => {
      if (code === 0) {
        console.log(`Result from Python: ${result.trim()}`);

        // PREPARING RESPONSE JSON
        let response = {};
        response.Email_Length = emailLength;
        response.Num_Links = numLinks;
        response.Contains_Links = containsLinks;
        response.Contains_Spam_Words = containsBadWords;
        response.Is_Fraud = result.trim() === '0' ? false : true;

        // SENDING THE RESPONSE
        res.status(200).send(response);
      } else {
        console.error(`Python process exited with code ${code}`);

        res.status(400).send({ 
          success: false,
          message: `Python process exited with code ${code}`
        });
      }
    });

    python.stdin.write(JSON.stringify(pythonInputArray));
    python.stdin.end();    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};