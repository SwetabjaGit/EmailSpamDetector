const Filter = require('bad-words');
const filter = new Filter();
const { spawn } = require('child_process');



const isLink = (text) => {
  const pattern = /^(https?:\/\/[^\s]+|www\.[^\s]+)$/i;
  return pattern.test(text);
}


exports.getEmailDetails = async (req, res, next) => {
  try {
    const emailContent = req.body.toString('utf-8');
    //console.log(emailContent);
    const emailLength = emailContent.length;
    console.log("Length", emailLength);

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

    const containsBadWords = filter.isProfane(emailContent);
    //console.log(containsBadWords);


    const pythonInputArray = [emailLength, +containsLinks, +containsBadWords];
    console.log(pythonInputArray);

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

        let response = {};
        response.Email_Length = emailLength;
        response.Num_Links = numLinks;
        response.Contains_Links = containsLinks;
        response.Contains_Spam_Words = containsBadWords;
        response.Is_Fraud = result.trim() === '0' ? false : true;

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