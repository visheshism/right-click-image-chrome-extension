# Get Images from Element - Chrome Extension

## Description

This Chrome extension allows users to retrieve images from a selected element on a webpage. It provides options to log the images to the console or open them in a new tab for easy viewing and access.

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/visheshism/right-click-image-chrome-extension.git
   ```

2. Navigate to the frontend folder:
   ```
   cd right-click-image-chrome-extension/frontend
   ```

3. Install dependencies:
   ```
   npm i
   ```

4. Build the static files:
   ```
   npm run build:out
   ```

5. Modify the static files:
   - Open `static/index.html`
   - Add `/static` to the beginning of the `href` attributes for CSS, JS, and icon files

6. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `right-click-image-chrome-extension` directory

## How to Use

1. Once the extension is installed, you'll see a new icon in your Chrome toolbar.

2. Navigate to any webpage.

3. Right-click on an element that contains images.

4. In the context menu, you'll see an option "Get Images from Element" with two sub-options:
   - "Log the images": This will log the image URLs to the console
   - "Open images in new tab": This will open a new tab displaying all the images found in the selected element

5. Select the desired option to retrieve and view the images.

Enjoy using the extension to easily extract and view images from web pages!
