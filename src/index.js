/* globals require global */
const _ = require('lodash');

const {
  FlexLayout,
  QCheckBox,
  QLabel,
  QLineEdit,
  QPlainTextEdit,
  QMainWindow,
  QPushButton,
  QPushButtonEvents,
  QWidget,
} = require('@nodegui/nodegui');

const NUMBERS = _.range(0, 10);
const ALPHABET_LOWER = _.range(97, 123).map(chr => String.fromCharCode(chr));
const ALPHABET_UPPER = _.range(65, 91).map(chr => String.fromCharCode(chr));
const ALL_POSSIBLE_CHARS = _.range(33, 127).map(chr => String.fromCharCode(chr));
const CHARSETS = [ALL_POSSIBLE_CHARS, [...NUMBERS, ...ALPHABET_LOWER, ...ALPHABET_UPPER]];

const win = new QMainWindow();
win.setWindowTitle('Password Generator');
win.resize(400, 200);

// Root view
const rootView = new QWidget();
const rootViewLayout = new FlexLayout();
rootView.setObjectName('rootView');
rootView.setLayout(rootViewLayout);

// Fieldset
const fieldset = new QWidget();
const fieldsetLayout = new FlexLayout();
fieldset.setObjectName('fieldset');
fieldset.setLayout(fieldsetLayout);

// Number characters row
const numCharsRow = new QWidget();
const numCharsRowLayout = new FlexLayout();
numCharsRow.setObjectName('numCharsRow');
numCharsRow.setLayout(numCharsRowLayout);

const numCharsLabel = new QLabel();
numCharsLabel.setText('Number of characters in the password:');
numCharsRowLayout.addWidget(numCharsLabel);

const numCharsInput = new QLineEdit();
numCharsInput.setObjectName('numCharsInput');
numCharsRowLayout.addWidget(numCharsInput);

const checkbox = new QCheckBox();
checkbox.setText('Include special characters in password');

// Generated password output
const passOutput = new QPlainTextEdit();
passOutput.setObjectName('passOutput');
passOutput.setReadOnly(true);
passOutput.setWordWrapMode(3);

// Button row
const buttonRow = new QWidget();
const buttonRowLayout = new FlexLayout();
buttonRow.setLayout(buttonRowLayout);
buttonRow.setObjectName('buttonRow');

// Buttons
const generateButton = new QPushButton();
generateButton.setText('Generate');
generateButton.setObjectName('generateButton');

const copyButton = new QPushButton();
copyButton.setText('Copy to clipboard');

// Add the widgets to the respective layouts
fieldsetLayout.addWidget(numCharsRow);
fieldsetLayout.addWidget(checkbox);
rootViewLayout.addWidget(fieldset);
rootViewLayout.addWidget(passOutput);
buttonRowLayout.addWidget(generateButton);
buttonRowLayout.addWidget(copyButton);
rootViewLayout.addWidget(buttonRow);

// Logic
function getCharSet(includeSpecialCharacters) {
  return includeSpecialCharacters? CHARSETS[0] : CHARSETS[1];
}

function generatePassword(passwordLength, charSet) {
  return _.range(passwordLength).map(() => _.sample(charSet)).join('');
}

// Event handling
generateButton.addEventListener(QPushButtonEvents.clicked, () => {
  const passwordLength = numCharsInput.text();
  const includeSpecialChars = checkbox.isChecked();
  const charSet = getCharSet(includeSpecialChars);

  passOutput.setPlainText(
    generatePassword(passwordLength, charSet)
  );
});

// Styling
const rootStyleSheet = `
  #rootView {
    padding: 5px;
  }
  #fieldset {
    padding: 10px;
    border: 2px ridge #bdbdbd;
    margin-bottom: 4px;
  }
  #numCharsRow, #buttonRow {
    flex-direction: row;
  }
  #numCharsRow {
    margin-bottom: 5px;
  }
  #numCharsInput {
    width: 40px;
    margin-left: 2px;
  }
  #passOutput {
    height: 85px;
    margin-bottom: 4px;
  }
  #buttonRow{
    margin-bottom: 5px;
  }
  #generateButton {
    width: 120px;
    margin-right: 3px;
  }
  #copyButton {
    width: 120px;
  }
`;

rootView.setStyleSheet(rootStyleSheet);

win.setCentralWidget(rootView);
win.show();

global.win = win;
