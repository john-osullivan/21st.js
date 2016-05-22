import { Accounts } from 'meteor/accounts-base';

import 'QuizApp/methods';

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
