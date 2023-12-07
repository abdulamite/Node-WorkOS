# WorkOS SSO and Directory Sync Showcase

This document outlines the setup process for an example application demonstrating WorkOS Single Sign-On (SSO) and Directory Sync. The application is built with Node.js, Express, and the WorkOS Node SDK.

:warning: Disclaimer: This application is not intended for production use. It serves as a showcase for WorkOS SSO and Directory Sync. I am aware of the shared server-side logged-in session. A fake account has been created to demonstrate the functionality of WorkOS SSO and Directory Sync, showcasing logged-in information from Okta. In real-world applications, sessions should be stored using authenticated session cookies.

## Prerequisites

* Node.js v10 or higher
* WorkOS Staging Account and access to the following:
    * WorkOS API Key -- [Get your WorkOS API Key here](https://dashboard.workos.com/api-keys)
    * WorkOS Client ID -- [Get your WorkOS Client ID Key here](https://dashboard.workos.com/api-keys)
    * WorkOS Organization ID - [Available in the WorkOS Dashboard](https://dashboard.workos.com/), click Organizations and select your organization and it will appear directly under the organization name
    * WorkOS Directory ID - [Available in the WorkOS Dashboard](https://dashboard.workos.com/), click Organizations, select your organization, locate "User Provisioning" and click "View directory". If your directory is active, the Directory ID will be displayed at the top of the page. with a value of `directory_**********`.
* SSO enabled with WorkOS SSO Connection
* Directory Sync enabled with WorkOS Directory Connection

Select a SSO connection provider [here](https://workos.com/docs/sso/1-configure-an-sso-connection). 

Select a Directory Sync connection provider [here](https://workos.com/docs/directory-sync/quick-start/1-create-a-new-directory-connection).

For this example I used Okta for both connections.

## Getting Started

1. Clone the repository by running the following command in your terminal:

    ```bash
    git clone https://github.com/abdulamite/Node-WorkOS.git
    ```
2. Install the dependencies by running the following command in your terminal:

    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory of the project and add the following environment variables:

    ```bash
    WORKOS_API_KEY='**********'
    WORKOS_CLIENT_ID='**********'
    WORKOS_ORG_ID='**********'
    WORKOS_DIRECTORY_ID='**********'
    ```

4. Add `http://localhost:3000/callback` as a redirect URI in your WorkOS Dashboard in the Redirects menu.

5. Now, modify the `routes/index.js` file on [line 24](https://github.com/abdulamite/Node-WorkOS/blob/6bccd7fbb82ea7e397b20f77f4241ba00f4e6b7c/routes/index.js#L23) to also be `http://localhost:3000/callback`.

6. Start the application by running the following command in your terminal:

    ```bash
    npm start
    ```

7. Navigate to `http://localhost:3000` in your browser to view the application. You should now see a page where you can login using your login provider if you have a connection with an active user. For example, if you have a connection with Okta and you have an active user, you can login using your Okta credentials.

8. Once you are logged in, you will also see a navigation bar with a link to the Directory Sync page. Click on the link to view the Directory Sync page. You should now see a page with a table of all the users in your directory.