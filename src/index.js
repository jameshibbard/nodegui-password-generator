/* globals require global */

const {
  FlexLayout,
  QCheckBox,
  QLabel,
  QLineEdit,
  QMainWindow,
  QPushButton,
  QWidget,
} = require('@nodegui/nodegui');

const win = new QMainWindow();
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
const passOutput = new QLineEdit();
passOutput.setObjectName('passOutput');
passOutput.setReadOnly(true);

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
