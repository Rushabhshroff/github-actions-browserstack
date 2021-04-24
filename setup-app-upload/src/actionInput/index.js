const core = require('@actions/core');
const github = require('@actions/github');
const constants = require('./../constants');


const {
  URLS,
  ENV_VARS,
  INPUT
} = constants;

class ActionInput {
  constructor() {
    this._fetchAllInput();
    this._validateInput();
  }

  _fetchAllInput() {
    try {
      this.username = process.env[ENV_VARS.BROWSERSTACK_USERNAME];
      this.accesskey = process.env[ENV_VARS.BROWSERSTACK_ACCESS_KEY];
      this.app_path = core.getInput(INPUT.APP_PATH);
      this.framework = core.getInput(INPUT.FRAMEWORK);
      this.test_suite_path = core.getInput(INPUT.TEST_SUITE);
    }
    catch(e) {
      throw Error(`Action input failed for reason: ${e.message}`);
    }
  }

  _validateInput() {
    if(this.test_suite_path && !this.framework) {
      throw Error(`for using ${INPUTS.TEST_SUITE} you must define the ${INPUTS.FRAMEWORK}`);
    }
  }

  setEnvVariables() {
    if(this.app_path) core.exportVariable(ENV_VARS.APP_PATH, this.app_path);
    if(this.framework) core.exportVariable(ENV_VARS.FRAMEWORK, this.framework);
    if(this.test_suite_path) core.exportVariable(ENV_VARS.TEST_SUITE, this.test_suite_path);
  }
}

module.exports = ActionInput;
