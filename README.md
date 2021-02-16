# NgWebex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Documentation 

Manage Webex Rooms:
 
	This app allows users to manage their own webex rooms like creating a room, adding the members to the rooms the user belongs to and sending messages to those rooms

Login page:

Auth component: 

- Has a login button and a title “Manage your Webex Rooms”
- On clicking login button it gets the webex access token set in the localStorage on successful login
- Auth Guard is set for all the components, room creation , adding members and sending messages pages can be seen only when the webex token is set in local storage. 
- During first time login, you may have to press the login button on the login page again after the successful login, if the token has not been set in the local storage by then. (open issue, need to find a solution when I get time). This is because of the Auth Guard that is set for the /roomcontrol component.
- During first time login once you press the login button again on the login page after successful login, it takes you to the room creation page, the redirect uri (https://deepthivarsha.github.io/manage-webex-rooms/roomcontrol)

Sidebar component:

- Have used momentum-ui ‘s sidebar navigation panel to display the action items or the page links under managing webex rooms
- The sidebar also includes the logout option and also displays the logged in user

Room Creation Component:

- This component contains an input field to accept the new room’s name. The field is mandatory.
Input validation is done to check the field for input (required) and momentum error alert banner is used to display the validation error messages.
- The Create Room button is enabled only when the user has entered the room name in the text box.
- On clicking the Create Room button, a dialog box appears (momentum-ui md-modal) showing the success or failure message.
- On successful room creation, the dialog box prompts the user if he wants to add members to the created room. Then the user is navigated to the “Add Members” page on clicking ok. The “Add members” page has a select field to select the rooms from and the user could see that the created room gets automatically selected in the select field for adding members.

Add Members Component:

- This component has a select field (ng-select) to list the rooms the logged in user belongs to. 1:1 spaces are not listed here. Only rooms of type "group" are added, so that the user can add members to the rooms. This is a multi-select field with maximum selection of 5 rooms. The select field is searchable.
- When the user has selected 5 rooms, a momentum ui alert banner info appears saying that the max allowed rooms is “5”.
- This page displays the room information of the last selected room. Brought in this feature so that users will be able to select the correct room based on the displayed room id of the selected room (as there are possibilities for 2 rooms to share the same room title).
- The page allows to add members by email id. The users can add any number of persons by providing their mail ids using Add more option.
- The fields are being validated for email inputs. When an invalid email format of text is being input, the page displays an error alert banner asking the user to enter valid email.
- The Add members button is enabled only when the form is valid with proper inputs.
- On clicking the add members button, a load spinner appears asking the user to wait till we add members.
- Once the operations are done, the modal displays the results of the member addition. It displays the reason why few members were not able to be added on unsuccessful operations. 

Send Message Component:
- This component has the same select field to display the list of rooms and also the room information to display the last selected room’s details.
- The component has a text box to type in the message and send message to the selected rooms.
- The select field has the created room selected when the user creates a room in the create room page.

Session Idle Check:

- When the session has been kept idle for 3600secs, the browser displays a dialog box saying “Session has been kept idle for a long time”  and logs out the user.

Auth Guard 

- Added guard to all routes except the login page. The condition for the guard is to check if localStorage has the webex token set. On failure of this condition, the app takes the user to login page and asks to enter the app after logging in


Github URL : https://github.com/deepthivarsha/manage-webex-rooms

Live App: https://deepthivarsha.github.io/manage-webex-rooms/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
