# Basic Teams Tab Extension Demo
This repo contains a very basic custom Teams tab. It was built using Visual Studio but the main code is not Visual Studio, .NET or even Microsft-specific. It is HTML, JavaScript, CSS and a very simple deployment step. The only JavaScript framework it uses is jQuery 

## Deployment
### Create a website
First, create a website using any web platform. If you clone this solution, you can open it in Visual Studio and press F5. You can even use ngrok (https://www.ngrok.io) to proxy to your localhost website so you don't even need to deploy this to real web-hosting provider, though doing so to Azure would also be very easy.

### Add the code
Go into the TabsDemo folder (it's also a VS project)and add the following files to your website:
* index.html
* config.html
* scripts/app.js
* scripts/config.js
* styles/styles.css

Reload your website and POW! you're 90% of the way there.

### Update with your Bing API key
My code uses the Bing News Search API (https://azure.microsoft.com/en-us/services/cognitive-services/bing-news-search-api/) as a simple REST endpoint for demonstration purposes. I chose it because it's simple and easy and only requires an API key. If you want to use it, you'll need to get your own key and make a small modification:

On line 54 of scripts/app.js, you'll need to modify the API key in the header of the AJAX request to your own key. The key in the repo will not work for you. 

### Prep for Teams deployment
Modify TabsDemo/manifest/manifest.json to reflect the specifics of your deployment. Here are the properties which need to be modified:
* packageName - feel free to use whatever you want but I have been told that a best practice is the reverse of the URL of your site
* developer.name -Should be self-explanitory. Feel free to use my name, I'm happy to take credit (but not blame), but putting your name in there is probably a better idea
* developer.websiteUrl - the URL where you're hosting this
* developer.privacyUrl - modify the hostname to reflect your domain. This page doesn't actually have to exist though it's probably a good idea if you take this to production
* developer.termsOfUseUrl - same as privacy URL
* staticTabs.contentUrl - update the domain name to reflect your domain
* staticTabs.websiteUrl - update the domain name to reflect your domain
* configurableTabs.configurationUrl - update the domain name to reflect your domain
* validDomains - update to reflect your domain. This is essentially a white list of domain names that Teams will load into it's iFrame. It does not control what domains can be called from the JavaScript in your tab

Now, using your preferred zip tool, including (on Windows) highlighting your files and right-click -> Send to -> zip archive. Name it whatever you want.

### Deploy to Teams
This branch does not contain the code for a configurable tab so you can only deploy it as a personal tab.
1. Click the elipsis along the left rail of the application/web page
2. Click "Get more apps"
3. Click "Upload a custom app"
4. In the Open dialog, find your zip file, select it and click Open

You won't get a configuration screen here as it is a static Tab in your Personal apps which don't support configuration.

# THAT'S IT
You have deployed a custom Tab to teams. You can now build on top of this very simple code base. If you've done any type of web development, you should feel comfortable to start enhancing this. There is tons of additional content around customizing Teams at dev.office.com.

I actually based this code off the code found here https://github.com/OfficeDev/TrainingContent/tree/master/Teams. This tutorial is considerably more comprehensive but also leans on some more complex code. My stuff here is almost as simple as it can be. 

## Deployment Configuration Explanation
If you're curious about the deployment process, read on...

Tabs in Microsoft Teams are nothing more than an iFrame to another website. As long as that website is accessible from the Teams app (it must be a publicly accessible endpoint), then Teams can host it in a Tab. The configuration comes down to the manifest.js file. That file provides the Teams application, whether it's on the desktop or the web, with a pointer to the application hosting your Tab. You can find the complete documentation on that manifest.json here: https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema

For deployment, all you need to do is add the manifest.json and the two icon (image) files to a zip file and that's what you upload to Teams.

I think it's important for developers to realize how easy this is and how simple the architecture is. It will hopefully accelerate your deployment of Teams.