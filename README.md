<p align="center">
  <img src="https://repository-images.githubusercontent.com/676714602/091106df-1845-4ce8-9011-7807620abd49" width="300px" height="300px"/>
</p>
<h1 align="center">Joanna's Blog</h1>

A simple nextJS blog website developed for a client that is connected to Wordpress as the backend.
<br></br>
<p align="center">
  <img src="https://blog.michaelkeates.co.uk/wp-content/uploads/2023/08/joannablog.jpg" width"140px"/>
</p>
<h2 align="left">Description</h2>
This is a sophisticated web application that combines the power of Next.js's SSR capabilities, WordPress's content management functionalities, and GraphQL's efficiency in handling user comments. This setup provides a seamless and engaging experience for users, offering fast loading times, real-time interactions, and the convenience of content management through WordPress as the client specifically required for the ease of posting new content.

<h2 align="left">Stack</h2>
<ul>
<li><a href="https://nextjs.org/)">Next.js</a> Next.js is a popular React framework that provides server-side rendering. SSR allows the initial page load to happen on the server side, enhancing performance and SEO</li>
<li><a href="https://chakra-ui.com/">Chakra UI</a> A simple, modular and accessible React UI component library</li>
<li><a href="https://www.framer.com/motion/">Framer Motion</a> An animation library for React</li>
<li><a href="https://github.com/apollographql/apollo-tooling/">Apollo</a> GraphQL to fetch posts and add comments to Wordpress</li>
<li><a href="https://wordpress.com/">Wordpress</a> A headless Wordpress instance as the backend</li>
</ul>
<h2 align="left">Images</h2>

<img src="https://blog.michaelkeates.co.uk/wp-content/uploads/2023/08/joannablog.jpg" width="45%" hspace="10"/> <img src="https://blog.michaelkeates.co.uk/wp-content/uploads/2023/08/joannablog2.jpg" width="45%" hspace="10"/>
<img src="https://blog.michaelkeates.co.uk/wp-content/uploads/2023/08/joannablog3.jpg" width="45%" hspace="10"/>

<h2 align="left">Variables</h2>
To set up the End point for the Wordpress URL simply create a '.env.local' in the root directory of the project and then add the following line to the file.
<pre class="gitcode">NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT="https://URL/graphql"</pre>


<h3 align="left">Author</h3>
<ul>
Michael Keates <a href="https://www.michaelkeates.co.uk">Website</a>
</ul>
