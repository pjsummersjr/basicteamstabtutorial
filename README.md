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
1. Go to your Teams app, on the desktop or in the browser
2. Go to one of your Teams and click the elipsis next to the Team name and then click Manage team
3. Click the Apps tab
4. In the bottom right corner, click Upload a custom app
   
   If you do not see this option, you either do not have permissions to sideload apps to this Team or side loading of apps has been disabled by your organization completely. If that's the case, either use a dev tenant, provision a trial tenant or reach out to your O365 administrator for assistance.

5. In the Open dialog, find your zip file, select it and click Open
   
If all goes well, you'll get a configuration screen (which doesn't do much in this case) and you'll have your custom Tab.

These steps deployed your app as a Team and group chat scoped Tab. To do it for a personal tab, do the following: 
1. Click the elipsis along the left rail of the application/web page
2. Click "Get more apps"
3. Click "Upload a custom app"

From here, follow the instructions as above from 5 onward. You won't get a configuration screen here as it is a static Tab in your Personal apps which don't support configuration.

# THAT'S IT
You have deployed a custom Tab to teams. You can now build on top of this very simple code base. If you've done any type of web development, you should feel comfortable to start enhancing this. There is tons of additional content around customizing Teams at dev.office.com.

I actually based this code off the code found here https://github.com/OfficeDev/TrainingContent/tree/master/Teams. This tutorial is considerably more comprehensive but also leans on some more complex code. My stuff here is almost as simple as it can be. 