import sys
import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Creating a small dataset with email features
""" data = {'Email_Length': [100, 500, 200, 700, 50, 300, 1200, 250, 400, 180],
        'Contains_Links': [1, 0, 1, 1, 0, 1, 1, 0, 0, 1],  # 1 = Yes, 0 = No
        'Contains_Spam_Words': [1, 0, 0, 1, 0, 1, 1, 0, 0, 1],  # 1 = Yes, 0 = No
        'Is_Fraud': [1, 0, 0, 1, 0, 1, 1, 0, 0, 1]}  # 1 = Fraud Email, 0 = Safe Email """

data = {
    'Email_Length': [1370, 973, 643, 874, 389, 1069, 91, 455, 790, 1337, 511, 1174, 142, 974, 1238, 584, 204, 351, 923, 434, 1108, 881, 230, 282, 689, 649, 1001, 88, 470, 471, 1039, 964, 915, 660, 1138, 435, 457, 1181, 220, 732, 778, 1071, 201, 114, 1293, 1450, 180, 1094, 215, 220, 841, 75, 1332, 120, 808, 1017, 923, 986, 678, 817, 1071, 1319, 927, 644, 519, 374, 153, 1272, 773, 426, 417, 1203, 1122, 364, 769, 899, 1477, 1335, 643, 1439, 930, 84, 1059, 230, 831, 219, 1045, 1381, 1022, 351, 504, 1404, 155, 310, 813, 1408, 1448, 890, 1151, 858],
    
    'Contains_Links': [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0],

    'Contains_Spam_Words': [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],

    'Is_Fraud': [1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0]
} 


df = pd.DataFrame(data)

# Display dataset
# print(df)

# Selecting Features (X) and Target (y)
X = df[['Email_Length', 'Contains_Links', 'Contains_Spam_Words']]
y = df['Is_Fraud']

# Splitting Data into 80% Training & 20% Testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and Train the Model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict on Test Data
# y_pred = model.predict(X_test)
# print("Predicted Labels:", y_pred)

# Accuracy Score
# accuracy = accuracy_score(y_test, y_pred)
# print(f"Accuracy: {accuracy * 100:.2f}%")

# Classification Report
# print("\nClassification Report:")
# print(classification_report(y_test, y_pred))

# Confusion Matrix
# conf_matrix = confusion_matrix(y_test, y_pred)
# sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', xticklabels=['Safe', 'Fraud'], yticklabels=['Safe', 'Fraud'])
# plt.xlabel("Predicted")
# plt.ylabel("Actual")
# plt.title("Confusion Matrix")
# plt.show()


# Example: Predict if a new email is fraud or safe
input_data = json.load(sys.stdin)
new_email = [input_data]  # [Email_Length=600, Contains_Links=Yes, Contains_Spam_Words=Yes]
prediction = model.predict(new_email)

print(prediction[0])

# if prediction[0] == 1:
#    print("🔴 This email is likely FRAUD (Spam)!")
# else:
#    print("🟢 This email is SAFE!")