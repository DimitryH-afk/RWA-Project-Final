RWA Assignment Project

This is the second repo as I had issues with pushing into it.

I have completed up to task 2 in the new project, and set up github and vercel. Then, I set up MongoDB, made a cluster and conencted it to VSCode with their corresponding extension and .env.local. Afterwards i added the register page and bcrypt login password in MongoDB. Then added the products page with a shopping cart feature

Although I was unable to get the wireframes done in time, I have now gotten a logout feature, manager page alongside a functional graph that uses CDN, checkout page, view cart page and some images to go along with the McDonalds items. 

I struggled the most with the session logic as i made it too complicated to the point of it just throwing back errors consistently. I fixed this issue by reverting to just using "const all = document.cookie.split(";");" in a "Use effect" method right after calling "use client;". 

there were many other issues and UI tweaks i believe I could've done to improve it including changing the background to be more fluid, the general layout of the buttons, some features i had in mind like showing the users email in the order history section for the managers site, also allowing the manager to access the customers site, and a few other finetuning details.

Overall i believe the main functionality and the goal of the assignment (bar the wireframes) is complete.