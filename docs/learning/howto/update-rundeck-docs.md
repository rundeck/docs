# How to Contribute to Rundeck Documentation

Just like our Rundeck Open Source solution, Rundeck Documentation is a shared resource that anyone can help contribute to.  Anything from typo’s to feature clarifications are a helpful way to give back to the Rundeck community.

# Prerequisites / Background

* Need a GitHub account. Sign Up at this link: [https://github.com/](https://github.com/)
* Understanding of Markdown Language. Learn more about it here: [https://www.markdowntutorial.com/](https://www.markdowntutorial.com/)

>The Rundeck documentation uses VuePress. Updates to the navigation menus may be necessary, but we ask that changes to the underlying VuePress be left to the Rundeck Team.

# Quick Doc Fixes

For simple documentation fixes it’s possible to make the changes right in GitHub.  Let’s get started with an example. For this example we have provided a page you are welcome to submit an update on at: [https://docs.rundeck.com/docs/learning/howto/docs-update-exercise.html](/learning/howto/docs-update-exercise.md)

1. Navigate to [https://github.com/rundeck/docs/](https://github.com/rundeck/docs/).
1. The content pages are in the /docs/ sub folder. The folder structure here will match what is shown in the URL of the page to be edited. ([https://github.com/rundeck/docs/tree/3.4.x/docs](https://github.com/rundeck/docs/tree/3.4.x/docs))
1. Navigate to the page that needs to be updated by going to learning > howto and finding the docs-update-exercise.md file
1. Feel free to add/edit content below the specified heading by clicking on the pencil icon on the GitHub page.
    ![Edit Page](@assets/img/howto-updatedocs-githubedit.png)
1. Add content below where it reads “**Edits welcome below this section**” then fill out the **Propose Changes** section with a Subject Line and details explaining the update.
    ![Propose Changes](@assets/img/howto-updatedocs-githubpropose.png)
1. This form will commit the change and provide a comparison view.  Click on **Create Pull Request** to finalize and send to the Rundeck team for approval.
    ![Compare Changes](@assets/img/howto-updatedocs-githubcompare.png)
1. Confirm the details in the Pull Request submission and click **Create Pull Request.**
    ![Submit Pull Request](@assets/img/howto-updatedocs-githubpullreq.png)

**Congratulations!**  Keep an eye out for comments/feedback via the comments section from our team.

# Sharing bigger content updates

The steps above work great for small/simple changes.  The Rundeck Docs is a public repository.  If you are familiar with `git` commands and want to clone the repository and manage/push your own updates please feel free to do so.

# Tips

* Images are stored in the `/docs/assets/img` folder.  There is an example image call in the sample page.  It is recommended to name the image in a way that ties it to the page/section it is used in.  For example `howto-example-joke.png`.  Be mindful of file sizes when creating images.
* Screenshots should be done in the most current version of Rundeck available. Easiest way to get those is by using the [Welcome Projects](/learning/howto/welcome-project-starter.md).
* Look at the markdown code on other pages for examples on how to incorporate tabs, and other Vue specific items.

Looking for content ideas to contribute?  Check out [https://github.com/rundeck/docs/issues](https://github.com/rundeck/docs/issues) for items that might need fixing.
