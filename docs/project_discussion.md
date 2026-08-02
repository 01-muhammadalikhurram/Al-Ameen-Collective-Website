Me:
I am added to a whatsapp group, where a vendor sends products images, along with their descriptions
I then sell those products using whatsapp status, outreaching customers, my approach is inefficient, and I need broader coverage, so I am going to build a website, I will be the deciding what are we going to build and what features it should have, and you will help me describing them more by discussing them with me and then writing prompt for the agent.
I have opened the editor in a workspace where the agent can see all the files, in a folder named data I have added images and their descriptions in a very well organized manner like for specific products and their descriptions I have created specific folders, and that folder has only those specific products and their descriptions written in .md file the agent will access those files and images to let itself know what kind of data are we dealing with that we needs to showcase to customers only necessary on cards and nice to have on details for products
we will be building it using another AI Agent, that is really good at writing code, and understanding context, as it is embedded into the IDE, so it can access all the files and folders in that workspace
You will be my prompt generator
who will generate very well detailed and precise prompt, telling the agent what is that we want to build each and every kind of detail, but without telling the agent how to build it
The agent will decide that approach autonomously or if it wants something from me, like api key or anything it can directly ask me
You will just generate prompt explaining the agent its responsibilities and what is it that we want to achieve
lets first discuss then on my command you will generate the prompt according to our discussion

so let the discussion start
I will be telling you how a customer/admin/vendor will interact with the website
then we will talk about tech stack we are going to use to build this
and then we will be writing prompts according to my decision
am I clear
tell me you are clear
and then I will start by telling you about this business
AI:
Crystal clear.

I fully understand my role:

1. **You** are the decision-maker – you define the business logic, user roles, interactions, and tech preferences.
2. **I** am your prompt engineer – I will ask clarifying questions, challenge assumptions where needed, and ultimately synthesize our discussion into a single, highly detailed, precision-crafted prompt.
3. **The AI Agent** in your IDE is the builder – it will read that prompt, access your `/data` folder (with the organized product images and `.md` files), and autonomously decide the architecture, code structure, and implementation details. I will **never** tell it _how_ to code, only _what_ to accomplish.
4. If the Agent needs API keys, environment variables, or external services, it will ask you directly – I won't pre-suppose those.

I am ready and waiting.

Please start by walking me through the **user roles and interactions** – go ahead and tell me exactly how the Customer, the Admin (you), and the Vendor will use this website. Take your time. I'm listening.
Me:
So actually its another business from the Faisalabad. It's owner approached me if I want to be added to a community where he would be sending his business products images, along with descriptions (such as product details (company name, material, and sometime length of the product), and product whole sale price).
It's actually a cloth shop, where customers can buy stitched, and unstitched clothes for both males and females.
The products he sends to group are also related to clothes and sometimes some other stuff
So he sends those products into whatsapp groups, and we get customers online.
For Example, Some how, I got a customer who wants to buy a cloth, the wholesale price for that cloth is PKR (now you know we are dealing in pakistan) 2000 (from description), so I need to sell it to customer for some high price lets say 3000, and customer also has to pay 250 for delivery charges. That makes a total of PKR 3250 that should be paid by the customer.
as soon as the delivery is done, and customer pays his amount, the vendor pays me my commission that is 1000.
That's how I generate revenue without inventory investment, I just need to sell it to other people for him at higher price so I can get the commission.
Tell me if you are clear, if there is any query ask, and then we will move on.
AI:
I am 100% clear on the business model. You are a **dropshipper/reseller** for a fabric/cloth merchant in Faisalabad. You take his B2B wholesale rates, add your markup (your commission), add delivery charges, and sell B2C to your online customers—without ever holding stock.

However, I have **3 critical questions** that will completely change the architecture and features of the website we are about to build.

**Question 1: Who handles the money and the shipping logistics?**
You said: _"as soon as the delivery is done, and customer pays his amount, the vendor pays me my commission that is 1000."_
This tells me the **vendor** might be handling the delivery and collecting the final payment directly from the customer (Cash on Delivery or bank transfer).

- **Scenario A:** The customer pays YOU (via JazzCash/EasyPaisa/Bank) the full PKR 3,250. _You_ then pay the vendor PKR 2,000 + PKR 250 delivery = PKR 2,250, and keep your PKR 1,000.
- **Scenario B:** The customer pays the VENDOR directly upon delivery. The vendor collects PKR 3,250, keeps PKR 2,250, and sends you PKR 1,000 as commission afterward.
- _Why this matters:_ If it's Scenario A, your website needs an integrated payment gateway and an order management system. If it's Scenario B, your website is purely a **lead-generation catalog** (no payments online), and the "checkout" is just a "Contact on WhatsApp to Buy" button.

**Question 2: What is the actual "Conversion" action on the website?**
When a customer lands on your website and likes a PKR 3,000 shirt:

- Do they click "Add to Cart" → "Checkout" → Pay online (Scenario A)?
- Or do they click "Interested / Buy Now" → fill out their Name, Address, and Phone number → you receive that lead → you manually forward that lead to the vendor → the vendor dispatches it?
- _Why this matters:_ If you are manually forwarding orders to the vendor via WhatsApp, the website just needs to collect leads beautifully and send you an email/notification. If you want automation, the website needs to notify the vendor directly.

**Question 3: Inventory / Availability status?**
The vendor sends pictures to the group. Does he tell you "this specific color/size is only 5 pieces left" or "sold out"? Or do you just post everything he sends, and only find out it's out of stock when the customer places an order and the vendor tells you?

---

**Take your time answering these three.** Once you answer, we will map out exactly how the **Customer**, **Admin (You)**, and **Vendor** will interact with this website, and then I'll generate that killer prompt for your IDE Agent. Proceed when ready!
Me:
Question 1: Who handles the money and the shipping logistics?
Answer: The vendor handles the money and the shipping logistics.
Question 2: What is the actual "Conversion" action on the website?
Answer: they will click "Buy Now" → fill out their Name, Address, and Phone number → I will receive that lead → I will manually forward that lead to the vendor → the vendor dispatches it. If we can do the automation it will be really great. We will discuss it in details in the future.
Question 3: Inventory / Availability status
The vendor sends pictures to the group. Does he tell you "this specific color/size is only 5 pieces left" or "sold out"? Or do you just post everything he sends, and only find out it's out of stock when the customer places an order and the vendor tells you?
Answer: Sometimes yes, many times no. Because he has a huge stock and he sends new products daily. For now if a customer places order, and it gets out of stock, we will inform him, and hide the product from display using the unavailable button from the admin side. We will discuss it in details in the future.
After you are clear about these things, I would like to discuss more about other stuff like customer user stories, admin/vendor user case stories, and maybe more things.
AI:
Perfect. I am entirely clear now.

Let me summarize the architecture implications of your answers before we dive into stories:

- **No payment gateway** – since the vendor handles money, the website is a **high-conversion catalog + lead generator**.
- **No real-time inventory system** – just an Admin toggle (Show/Hide) to manually remove sold-out items.
- **Automation is future scope** – for now, the site captures leads and stores them for you; you manually forward them to the vendor via WhatsApp/phone.

Since the vendor doesn't handle the website directly (you are the middleman), we are essentially building a **single-owner admin panel** (just YOU) + a **public customer storefront**.

---

Before I write the prompt, I need to extract **detailed user stories** from you. Let's go role by role. Please answer these **5 specific questions**:

**1. For the Customer (Browsing & Buying):**

- When a customer lands on your homepage, how do they find products? Do they see _everything_ in a grid, or do they filter by **Category** (e.g., _Men's Stitched_, _Women's Unstitched_, _Kids_, _Accessories_)?
- On the **Product Card** (the thumbnail they see in the grid), what **3-4 pieces of information** are absolutely mandatory to show? (e.g., Image, Name, Wholesale Price, and maybe a "New" badge?)
- On the **Product Detail Page** (when they click the card), besides the image and full description from the `.md` file, should they see the _Sale Price_ (your marked-up price like PKR 3,000) clearly? Or do you want to show both the _Wholesale_ (PKR 2,000) and _Your Price_ (PKR 3,000) to build trust?

**2. For the Admin (YOU) - Managing Leads:**

- When a customer fills out the "Buy Now" form (Name, Address, Phone), where do you want to see this lead?
  - Just a simple list inside the website's Admin Dashboard?
  - Or do you want an instant **Email** and **SMS** notification sent to your phone so you can forward it to the vendor immediately without logging in?
- In the Admin Dashboard, what statuses do you want to assign to each order? (e.g., _New Lead → Forwarded to Vendor → Shipped → Commission Received_). This will help you track your PKR 1,000 earnings.

**3. For the Admin (YOU) - Managing Products:**

- Since the vendor sends new products daily to WhatsApp, how do you plan to add them to the website?
  - Will you manually create a new folder in the `/data` directory with images and an `.md` file (meaning the AI Agent just reads the folder, and you update it via FTP/Git)?
  - Or do you want a **"Add New Product"** button inside the Admin Dashboard, where you upload images and type the description, and the website saves it automatically (so you don't touch code/files)?
- For the "Unavailable" button you mentioned – should it just hide the product from the customer view entirely, or show it with a faded "Out of Stock" badge?

**4. For the Vendor (Indirectly):**

- Does the vendor know you are building this website? Will you ever give him a login to see the orders directly, or will **you** remain the single point of contact (you receive the lead, you WhatsApp him)? _(I am assuming you are the single point of contact for now)._

**5. Your Markup Logic:**

- You mentioned wholesale is PKR 2,000 and you sell at PKR 3,000. Is your markup always a **fixed percentage** (e.g., +50%) or a **fixed flat amount** (e.g., +PKR 1,000) across all products? Or does it change product-by-product? This will determine if the Agent auto-calculates your selling price, or if you type it manually for each product.

---

Take your time answering these. Once you reply, we will have **everything** needed (business logic, UI expectations, admin workflows, and data structure) to write an airtight, 10/10 prompt for your AI Agent. Fire away!
Me:
you will not generate prompt, until I specifically you to do so.
AI:
Understood. Loud and clear.

I will **not** generate the prompt until you give me the explicit command to do so. I will strictly remain in "discussion mode" until that moment.

Now, with that rule locked in my memory: **we are still in the discussion phase**, and I am waiting for your answers to my 5 questions from my previous message.

To jog your memory, I asked you to clarify:

1. **Customer experience** – How they filter products (Categories), what 3-4 details must appear on the product card, and whether to show both wholesale & your price or just your selling price on the detail page.
2. **Admin Leads** – Where you want to receive leads (Dashboard list vs. Email/SMS) and what order statuses you want to track.
3. **Admin Products** – How you want to add new products (manually via `/data` folder vs. a web-based "Add Product" form) and whether "Unavailable" hides the product entirely or shows it as faded.
4. **Vendor Access** – Confirming whether you are the sole admin, or if the vendor gets a login.
5. **Markup Logic** – If your PKR 1,000 markup is fixed, percentage-based, or varies per product.

Please take your time and answer these one by one. Once we finalize these details, we will have a complete blueprint, and then—and only then—will I write that final, detailed prompt for your agent. Proceed whenever you are ready.
Me:
now we are going to discuss the customer experience (user case story for customer).

- user enters the website URL into the search bar of his browser
- user is taken to a website homepage where he can see
  -- a ribbon on top where sales alert or free delivery alerts will be shown. Right now, there is no free delivery but that top ribbon will be used for shop alerts or free delivery or other alerts. It would be minimalistic, just a black background, where on the center shopping alerts will be displayed with white color one by one in a way that one alert is shown it slides to the left, and from the right a new shop alert will slide to the center and so on.
  -- below the ribbon is the navigation bar as:
  --- background color: #DBB177
  --- Font Color: #510F17
  --- [Logo: Al Ameen Collective (Left (Vertically Centered))] [Catalog About FAQs Contact Cart (Track Order) (Search Bar) (Right (Vertically Centered))]
  --- on clicking the catalog, the customer is taken to show all the available products where there are filter buttons(the filter buttons will be derived from categories, when the admin enters new products, for example admin adds a new product with categories lawn, summer, then these two categories will appear for customer, if he clicks anyone one of these filters/categories the products with these categories will be displayed) and a search bar (for catalog) is also present (there are two search bars, one at the navbar, and one at the catalog, both have the same functionality, if navbar search bar is pressed, it takes customer to catalog, and shows the results according to what customer searched for). on clicking the filter button only product with description having those filter words will be shown, but if a customer writes something in search bar (he can mistake spellings) the similar products will be shown.
  --- on clicking about, he will be taken to about section, about will be in the footer, the website just scrolls and about is shown
  --- on clicking FAQs, he will be taken to footer where FAQs will be written, on clicking an FAQ, it will expand and shows answer to that specific FAQ. the FAQs may include return policy, order checking, wrong order, faulty order, if more FAQs are needed to be included I will tell you and we can add more.
  --- Contact button will scroll down to the footer showing my whatsapp contact so the customers can directly contact me for queries.
  --- Track Order will take the customer to a page where he needs to enter his tracking/order id into a text field, upon clicking track order button on the page, details about his order such as pending/confirmed/cancelled/delivered will be shown.
  --- the search bar will show products with similar items searched for such lawn the customer may mistakeenly write laun so we will show lawn.
  -- below the navbar is website body where the available products are shown:
  --- background color: white
  --- the products are shown in cards style, the cards have a light shadow
  --- for each card contains and displays:
  ----the product image,
  ---- product price,
  ---- product code (no two products can have same product code),
  ---- summarized (catchy) details,
  ---- details button (on pressing the card the details are shown),
  ----order now button (which instantly takes user to fill a form for his name, address, and whatsapp number => after filling the form => confirm order button => two things happen
  ----- 1. user's order request is shown to admin as pending.
  ----- 2. user's whatsapp opens in my DM, with a template message filled with user details from form, and the product details he has ordered except for the product price, just waiting for user's confirmation to send the order details to me.),
  ---- add to cart button (press, and product is added to cart, it will remain there in the cart until user himself deletes it from the cart. It will remain there in the cart even after the user has left website).
  ---- the customer can see different cards, the cards contain product summarized description, product image, price, a button for order now, a button for add to cart, product code, and a button for details.
  ---- if the customer clicks a card, there he will be shown product description about texture, stuff, height, length, etc. and below will be shown a section for similar products where the products with similar description or who falls under similar categories but with different product codes will be shown.
  -- below the website body is the footer where all the other sections like about, contact, and FAQs is present as discussed above already that pressing some buttons scrolls the website to footer where these will be present.
  Now lets talk more about if a customer decides to order now:
- if a customer clicks order now, he will be taken to fill a form where he enters his phone number, whatsapp number, address, and full name, and some optional details.
  -- as soon as he clicks order now button in the form, Two things will happen:
  --- 1. his whatsapp opens at my chat, and a template message is filled with details he enterd in the form, along with a link for order tracking (which is a public link and can be used by anyone to show the order details to anyone, about order ID, product image, product total price, delivery charges, and customer total (customer pay upon order delivery))
  --- 2. entry/entries is created in db against order id,
  ---- the public link will show the customer his details, product/products details, order status (pending/confirmed/cancelled/delivered), and total price.
  ---- the private entry/entries will be used by admin to set status of the order to confirmed/cancelled/delivered, and more details such as customer details, product details, total price to_be_paid/paid by customer, my commission, wholesale price, delivery charges, and maybe some more details.
  ---- the vendor link (private, need more discussion) entries, that will be sent by me to the vendor to open the new/past order details, where he can see the order details, and my commission, etc.
- if a customer clicks add to cart button for a product, the product is added to the cart, and remains there until he himself don't deletes it from there.
  -- customer clicks the cart button, and he will be shown what he has added in his cart, and his cart details, total price, some kind of vertical list where he can see +/- button against his added to cart products so he can increase or decrease the number of items if he reduces the number to zero by clicking - button, the product gets removed from cart.
  -- customer proceeds to checkout, his order details, and total price is shown along with delivery charges, he fills a form, presses checkout same things happen as for order now, like entries created, links created, etc.
  This is the planned customer user story, and customer experience.
  anything unclear you may ask, I forgot you may ask.
  after everything is cleared we will move forward for more user stories and other feature discussions
  AI:
  I have read and absorbed every single detail of your customer user story. This is a beautifully thought-out flow, and I can already visualize the entire frontend behavior, the database schema (orders, products, cart sessions), and the dual-link system (public tracking vs. private admin panel).

I have **7 critical clarifications** I need before I consider this customer story fully "locked in." Once you answer these, we have a flawless blueprint for the customer-facing side.

---

**1. The "Card Click" vs. "Details Button" behavior:**
You said: _"details button (on pressing the card the details are shown)"_ and later _"if the customer clicks a card, there he will be shown product description"_.

- Is the **entire card** clickable to go to the Product Detail Page?
- Or is there a separate small "Details" button/icon on the card that takes you there, while clicking the card itself does nothing (or adds to cart)?
- _(My assumption: The whole card is clickable to go to the detail page, and the "Details" text is just a label on the card. Please confirm.)_

---

**2. The "Summarized (catchy) details" on the card vs. Full description in the `.md` file:**
Your `/data` folder has `.md` files with full descriptions.

- How does the system know what the **"Summarized (catchy) details"** are for the card?
  - Should it automatically take the **first 60 characters** of the `.md` file?
  - Or will you add a specific line in the `.md` file like `summary: "Beautiful lawn summer dress"` that the Agent looks for?
  - _(My assumption: The Agent will parse a frontmatter/metadata section in the `.md` file for `summary` and `category`, and fallback to truncating the main text if missing. But I need your explicit decision.)_

---

**3. Delivery Charges (PKR 250) – Fixed or Variable?**
You mentioned PKR 250 for delivery earlier.

- Is this a **flat rate** (PKR 250) for every single order across Pakistan, regardless of city or weight?
- Or does it change based on the customer's city (e.g., Lahore = PKR 200, Karachi = PKR 350)?
- _(My assumption: It's a flat PKR 250 for now, and you will hardcode it. Confirm this so the Agent can set it as a configurable environment variable.)_

---

**4. Product Code generation:**
You said _"no two products can have the same product code"_.

- Will **you (the admin)** manually assign a unique code (e.g., `AAC-001`) when you add the product?
- Or should the **system auto-generate** a unique alphanumeric code (e.g., based on timestamp or UUID) when the product is added to the database?
- _(My assumption: The system auto-generates it to avoid human error, but you can still view and reference it. Confirm.)_

---

**5. Cart Persistence (LocalStorage or DB?):**
You said the cart remains _"even after the user has left the website"_. Since customers do not log in, the only way to achieve this is using the browser's **LocalStorage**.

- Are you comfortable with LocalStorage (meaning if they clear their browser cache, the cart resets)?
- Or do you want to assign a temporary anonymous session via cookies/DB so the cart persists across devices/browsers (which is much harder)?
- _(My assumption: LocalStorage is perfectly fine for your use case. Confirm so the Agent doesn't over-engineer a session DB.)_

---

**6. Fuzzy Search ("laun" → "lawn"):**
You specifically mentioned spell-checking.

- Do you want the Agent to implement a **fuzzy search library** (like `Fuse.js` in JavaScript) that handles typos automatically?
- Or do you just want a basic "contains" search, and you will manually correct your product tags/categories to avoid misspellings?
- _(My assumption: A lightweight fuzzy library is best for UX. Confirm so the Agent includes it.)_

---

**7. The "Order Now" form vs. "Checkout" from Cart – identical behavior?**
You said both flows do the same thing: create an order entry, generate public/private links, and open WhatsApp.

- For the **"Order Now"** button on a single product: Does it add only that 1 product to the order (quantity = 1)?
- For **"Checkout"** from the Cart: Does it allow multiple products with quantities (e.g., 2 shirts + 1 trouser) in a single order, with a combined total price?
- _(My assumption: Yes, Order Now = single item, quantity 1. Checkout = multi-item, with quantities. Confirm.)_

---

Take your time answering these 7 points. Once you do, I will mark the **Customer Story** as 100% complete, and we will move on to the **Admin (You)** user story, where we will discuss your dashboard, order statuses, commission tracking, and how you hide/sold-out products.

Proceed when ready!
Me:
Question 1. The "Card Click" vs. "Details Button" behavior:
Answer: the entire card clickable to go to the Product Detail Page. The whole card is clickable to go to the detail page, we can say that the card itself is the details button, so there is no details button, the card itself is the details button (any more clarifications?)

Question 2. The "Summarized (catchy) details" on the card vs. Full description in the .md file:
Answer: The admin will add the product from his admin side, nothing is being taken using files, those files are just sample for the agent to understand what kind of details a product may have, as details sent by vendor are not in a consistent template manner, like every product detail will not have details for length, height, some may have, and etc. So the sample file's purpose is that the agent know, what kind of details are there, so he knows, when admin is adding new product, which fields to mark necesaary, and which fields to mark optional. The admin himself will add the catchy summarized detail, entire description, product images (drag and drop), and other data entirely by himself. Here's some sample descriptions by vendor:
Description #1:
_NISHAT_
_*ALLOVER LAWN 2pc*_
100% LIKE Original
Replica

CUTTING
3.5 Gaz

_Fabric_
Lawn
_Shirt_
Printed Lawn
_Trouser_
Printed Lawn
Colour and Fabric Guaranteed 100%

BEAUTIFUL DESIGNS
COMBINATIONS😍✨

      *Whot Sale Price*

    *Set Price : 1550*

_Single Suit : 1650_

Description #2:
💕💕*Alhamdulillah*💕💕

🧵 _Fabric Quality lawn_

🧵 _Description_

`3PC Suit`

🧵 _Front fully heavy Emb_
_Daman Emb work_
🧵 _Sleeves heavy embroidery_
🧵 _Plain lawn trouser_
🧵 _print munnar shwal_

_Whole Sale Price : 2950_

See the inconsistency, so I will be filling up product details all by myself

Question 3. Delivery Charges (PKR 250) – Fixed or Variable:
Answer: Variable, I will be managing delivery charges from admin side, I may increase them or decrease them, and I can also offer some discounts on delivery charges like free delivery on orders more than 9999 I will be managing this from admin side, will talk in more details later.

Question 4. Product Code generation:
Answer: The system generates a meaningful suggested product code, and I can make changes to it, assign it or simply assign it as it is.

Question 5. Cart Persistence (LocalStorage or DB?):
Answer: Local Storage

Question 6. Fuzzy Search ("laun" → "lawn"):
Answer: implement a fuzzy search library (like Fuse.js in JavaScript) that handles typos automatically, A lightweight fuzzy library is best

Question 7. The "Order Now" form vs. "Checkout" from Cart – identical behavior:
Answer: For the "Order Now" button on a single product: Does it add only that 1 product to the order (quantity = 1)? Yes
For "Checkout" from the Cart: Does it allow multiple products with quantities (e.g., 2 shirts + 1 trouser) in a single order, with a combined total price? Yes
Yes, Order Now = single item, quantity 1. Checkout = multi-item, with quantities. Confirm.

Anything else?
AI:
Excellent. We are **fully locked** on the Customer User Story.

To summarize your final decisions for my records:

- **Card = Details Button** (entire card clicks through).
- **Admin manually enters ALL product data** via a web form (the `/data` folder is **reference only** for the Agent to understand the unstructured nature of vendor descriptions, so it knows which fields to make mandatory vs. optional).
- **Delivery charges** = variable, managed by you from the admin panel (with future logic for free delivery thresholds).
- **Product Code** = system-suggested (meaningful) but editable by you before saving.
- **Cart** = LocalStorage.
- **Search** = Fuzzy (Fuse.js).
- **Order Now** = Single item, Qty 1. **Checkout** = Multi-item with +/- quantities.

---

With that out of the way, we now move to the **Admin (You) User Story**. This is the backbone of your operations.

I need you to walk me through exactly how you want to manage products, orders, delivery charges, and view your commissions. I have **8 targeted questions** below. Please answer them one by one:

---

**A. Product Management (Adding/Editing Products):**
You said you will manually add products via the admin panel.

1. **What specific fields** do you want in the "Add New Product" form?
   - (e.g., _Product Name, Category/Tags, Catchy Summary, Full Description, Wholesale Price, Your Selling Price, Multiple Images (drag-drop), Stock Status (In Stock / Out of Stock), Product Code_).
   - Are there any fields from the vendor descriptions (like _Cutting_, _Fabric Type_, _Shirt/Trouser details_) that you want as **dedicated separate fields** for easy filtering, or will you just dump everything into the "Full Description" text area?

2. **Product Code Auto-Suggestion:** You said "meaningful suggested product code."
   - Should it be based on the **Category** (e.g., `LAWN-001`, `EMB-002`)?
   - Or based on **Date/Time** (e.g., `AAC-260801`)?
   - Or a mix (e.g., `CAT-YYYYMMDD-XXX`)? Tell me your preference so the Agent can code the generation logic.

---

**B. Order Management (The Core Workflow):**
We have the public tracking link and the private admin link.

3. **Admin Order List/Dashboard:** When you log in as admin, what do you want to see first?
   - A simple table/list of all orders with columns: _Order ID, Customer Name, Total Amount, Status (Pending/Confirmed/Shipped/Delivered/Cancelled), Date_?
   - Do you want a **filter** on this list (e.g., Show only "Pending" orders so you can forward them to the vendor quickly)?

4. **Updating Order Status:** When you click on a specific order from the list, you see the full details (customer info, product list, total, commission, delivery charges).
   - How do you change the status? (A dropdown button that says "Mark as Confirmed", "Mark as Shipped", "Mark as Delivered", "Cancel Order")?
   - When you change the status to "Delivered", does that automatically mean you have received your PKR 1,000 commission? Or do you manually mark "Commission Received" separately?

5. **The "Vendor Link/View":** You mentioned a private link for the vendor.
   - Do you want a **separate login** for the vendor (username/password)?
   - Or do you want a **special private URL** (e.g., `yoursite.com/vendor/order-123`) that you manually copy-paste and send to the vendor via WhatsApp, which shows them the order details (customer address, products, total to collect, your commission) without them needing to log in?
   - _(My assumption: A special private URL is much easier for a busy vendor—no login required. Confirm.)_

---

**C. Delivery Charges & Discounts (Admin Config):**
You said you want to manage this from the admin side.

6. **Delivery Settings Page:** Do you want a dedicated "Settings" page in the admin panel where you can:
   - Set the **base delivery charge** (e.g., PKR 250).
   - Set a **Free Delivery Threshold** (e.g., "If order total > PKR 9,999, delivery is free") with an on/off toggle?
   - _(This keeps it flexible so you don't need to touch code.)_

---

**D. Admin Dashboard & Commission Tracking:**

7. **Earnings/Commission View:** As a reseller, you care about your total commissions.
   - Do you want a small **Dashboard widget** showing: _Total Orders, Pending Orders, Total Commission Earned (from Delivered orders), and Total Commission Pending (from Confirmed/Shipped orders)_?
   - This will help you track your revenue at a glance.

---

**E. Hiding/Unavailable Products:**
You mentioned hiding products when they go out of stock.

8. **Hide Product Flow:** In the admin product list, do you want a simple **Toggle Button** (Active/Inactive) for each product?
   - When toggled to "Inactive", the product disappears from the customer catalog completely.
   - Or do you want it to show a "Sold Out" / "Unavailable" badge on the card instead of disappearing? (This affects customer trust—they know you had it but it's gone).

---

Take your time answering these 8 questions. Once you finish this, we will have the complete Admin blueprint, and I will then ask a few rapid-fire questions about the Tech Stack (Framework, Database, Hosting) before I generate the final master prompt for your Agent. Proceed when ready!
Me:

1. What specific fields do I want in the "Add New Product" form?

- Product Name,
- Category/Tags,
- Catchy Summary,
- Full Description,
- Wholesale Price,
- Multiple Images (drag-drop)
- Male/Female (I think it goes into category)
- Color
- more optional fields such as length, shirt/trouser(I don't know what should be the field title for shirt/trouser)
- Tell me one thing
  -- What would be the answers to the above fields for this description:
  --- _NISHAT_
  _*ALLOVER LAWN 2pc*_
  100% LIKE Original
  Replica

CUTTING
3.5 Gaz

_Fabric_
Lawn
_Shirt_
Printed Lawn
_Trouser_
Printed Lawn
Colour and Fabric Guaranteed 100%

BEAUTIFUL DESIGNS
COMBINATIONS😍✨

      *Whot Sale Price*

    *Set Price : 1550*

_Single Suit : 1650_

- If I am missing any field please suggest

2. Product Code Auto-Suggestion:
   It should be based upon category, color, and gender (odd numbers for male, and even numbers for female) for example: LWN-RD-0018 or WW-BL-1023, where LWN = lawn, RD = red, even = female, WW = wash n wear, BL = Blue, and odd number = male.

3. Admin Order List/Dashboard: When you log in as admin, what do I want to see first?
   Answer:

- A Dashboard, with overall analytics such as total orders, pending orders, confirmed orders, delivered orders, cancelled orders, Filed for Return, returned orders (oops! I forgot, we need to manage returns too.), Income from (Total Orders (should earn), Pending Orders (Potential), Cancelled Orders, Returned Orders, Delivered Orders)
- Seperate Order Management from Dashboard, Dashboard is only for overviews in the order management
  -- A simple table/list of all orders with columns: Order ID, Customer Name, Total Amount, Status (Pending/Confirmed/Shipped/Delivered/Cancelled/Filed for Return/Returned), Date, a button to update status
  I want a filter on this list (e.g., Show only "Pending" orders so I can confirm and forward them to the vendor quickly)

4. Updating Order Status:

- How do you change the status?
  -- A dropdown button that says "Confirm Order", "Order Shipped", "Order Delivered", "Cancel Order", "Filed for Return", "Order Returned" or better words according to standards
- When you change the status to "Delivered", does that automatically mean you have received your PKR 1,000 commission? Or do you manually mark "Commission Received" separately?
  -- manually mark "Commission Received" separately

5. The "Vendor Link/View":

- a separate login for the vendor (username/password), we will have a vendor view similar to admin view
- do you want a special private URL (e.g., yoursite.com/vendor/order-123) that you manually copy-paste and send to the vendor via WhatsApp, which shows them the order details (customer address, products, total to collect, your commission) without them needing to log in? I want to have both, when the vendor will login he can see all the orders from me, so my performance to him. and private link for every order confirmed, when I (admin) click on an order for details, there will be a link for vendor too, which I can just copy from there via button (like standard logo for copy, which turns into a tick, along with a message for copied successful) and send to the vendor via whatsapp

C. Delivery Charges & Discounts (Admin Config): 6. Delivery Settings Page:

- I want a dedicated page in the admin panel where I can:
  Set the base delivery charge (e.g., PKR 250).
  Set a Free Delivery Threshold (e.g., "If order total > PKR 9,999, delivery is free") with an on/off toggle?

D. Admin Dashboard & Commission Tracking: 7. Earnings/Commission View:

- I think I have explained above about the dashboard, yeah add Total Commission Earned (from Delivered orders), and Total Commission Pending (from Confirmed/Shipped orders), and related widgets too, and also beneath the widgets add something like best selling products for most sold products shown in a sorted order from most to least sold

E. Hiding/Unavailable Products: 8. Hide Product Flow:

- a simple Toggle Button (Active/Inactive) for each product. When toggled to "Inactive", the product disappears from the customer catalog completely.

Now all your questions are answered, if you still need clarification ask me
Now let me tell you something more:

- at the end of link add /admin, and you are infront of admin login screen.
- admin logs in with his creds
- the admin can see a dashboard with total orders, etc(you know the options, but you still want clarification ask me).
- beneath the dashboard widgets is a list of products sorted in order most sold to least sold, and least returns to most returns
- the admin can see the data for past orders showing past customers for what has ordered previously
- the admin can change the status of pending orders, and so on
- the admin can see the orders details
- the admin can see details for pending, canceled, and confirmed order, and who has ordered them their details and phone numbers.
- the admin can add new products to the catalog
- the admin can hide products from the catalog.
- the admin can update the catalog products
- the admin can set profit for all the products
- the admin can set profit for specific products

Anything else? Anything for clarification? You may ask
AI:
We are **phenomenally close** to the finish line. You have given me incredibly detailed, actionable answers.

I have mapped everything you just said, and I have **2 final clarifications** (one regarding the fields, and one regarding profit logic), plus we need to **lock in the tech stack** before I generate the prompt.

---

### 1. Addressing your "Shirt/Trouser" field question:

Looking at your sample description (_NISHAT ALLOVER LAWN 2pc_), the vendor often mentions _Shirt_ and _Trouser_ separately because the fabric/print differs between them. Instead of two separate fields called "Shirt" and "Trouser", I strongly suggest the following **standardized database fields** that cover 90% of your inventory:

- **Brand / Collection** (e.g., _Nishat_, _Alkaram_) – _You didn't list this, but it appears in descriptions. Add it!_
- **Product Type** (Dropdown: _2PC Suit_, _3PC Suit_, _Single Shirt_, _Single Trouser_, _Unstitched Fabric_)
- **Fabric Type** (e.g., _Lawn_, _Cotton_, _Khadar_, _Silk_)
- **Cutting / Size** (e.g., _3.5 Gaz_, _30x30 Inches_, _M/L_) – _Optional field._
- **Shirt Details** (Text area, optional – for describing print/embroidery on the shirt)
- **Trouser Details** (Text area, optional – for describing the trouser fabric/print)

Now, **mapping your sample description** to these fields, so you can visualize it:

- **Product Name:** _ALLOVER LAWN 2pc_
- **Brand:** _NISHAT_
- **Category/Tags:** _Lawn, Summer, Replica_ (you tag it manually)
- **Gender:** _Female_ (you tag it manually)
- **Color:** _[You will manually select the dominant color, e.g., Red/Multi, as the vendor didn't specify]_
- **Product Type:** _2PC Suit_
- **Fabric Type:** _Lawn_
- **Cutting/Size:** _3.5 Gaz_
- **Shirt Details:** _Printed Lawn (Allover Print)_
- **Trouser Details:** _Printed Lawn_
- **Catchy Summary:** _Beautiful allover lawn 2pc suit with premium fabric and vibrant designs._
- **Full Description:** _[Copy-paste the vendor's exact text here]_
- **Wholesale Price:** _1,550_ (Set price, assuming you buy the set)
- **Your Selling Price / Markup:** _[Calculated by system based on your profit rules]_

**Does this field structure feel intuitive to you? If yes, we lock it.**

---

### 2. The Profit / Markup Logic (Crucial!):

You said: _"admin can set profit for all the products"_ and _"admin can set profit for specific products"_.

- Is this profit a **Fixed Flat Amount** (e.g., "Add PKR 1,000 to every product")?
- Or is it a **Percentage** (e.g., "Add 50% to the wholesale price")?
- _My assumption (based on your PKR 1,000 example):_ You want a **Global Flat Commission** (e.g., PKR 1,000 for all products), but for specific expensive/cheap items, you want to override it with a custom flat amount.
- **Please confirm**: Is it a flat PKR amount, or a percentage? Also, where do delivery charges fit in? (Selling Price to Customer = Wholesale + Your Profit + Delivery Charges).

---

### 3. The Tech Stack (The most important decision for the Agent):

The Agent in your IDE can write anything, but it needs to know the **ecosystem**. Please tell me which stack you prefer:

**Option A: Modern JavaScript (MERN / Next.js)**

- Frontend: React.js with Tailwind CSS (or Next.js 14 App Router).
- Backend: Node.js + Express (or Next.js API routes).
- Database: MongoDB or PostgreSQL (via Prisma ORM).
- Hosting: Vercel / Render / any VPS.

**Option B: Python (Django / Flask)**

- Frontend: Django Templates or React.
- Backend: Django (Batteries included – Admin panel, ORM, Auth are built-in!).
- Database: PostgreSQL / SQLite.
- Hosting: PythonAnywhere / VPS.

**Option C: PHP (Laravel)**

- Frontend: Blade templates + Alpine.js / Livewire (or React).
- Backend: Laravel (Eloquent ORM, built-in auth).
- Database: MySQL.
- Hosting: Shared hosting (cheaper) or VPS.

**My suggestion:** Since you are in Pakistan and might want to host it affordably, **Laravel (Option C)** or **Django (Option B)** will save you months of building an admin panel from scratch because they come with built-in admin auth, CRUD generation, and database migrations. However, if you prefer a modern, snappy single-page app (SPA) feel, **Next.js (Option A)** is excellent.

**Please pick A, B, or C.** Once you tell me the stack, the database choice, and confirm the Profit logic (Flat vs. Percentage), I will take the **entire discussion** and generate your final, flawless, production-grade prompt for the AI Agent.

Proceed when ready!
Me:

1. Does this field structure feel intuitive to you? yes, but instruct the agent for the field structure that it should be according to the samples, that all kind of descriptions fits in easily, as there is lot of inconsistencies in the descriptions by vendor.
2. The Profit / Markup Logic:

- This profit is a Fixed Flat Amount (e.g., "Add PKR 1,000 to every product")
- Global Flat Commission
- For specific expensive/cheap items, I want to override it with a custom flat amount.
- Selling Price to Customer = Wholesale + Your Profit
- when customer go for check out or order now, there you add delivery charges no matter how large the order is, delivery charges is a one time payment per order.
  we are not done yet
  we have to talk about vendor side yet
  AI:
  Perfect. We are locking those points right now:

- **Field Structure**: Confirmed. The Agent will build a flexible schema with mandatory fields (Name, Category, Gender, Color, Wholesale Price, Summary, Description, Images) and _many optional fields_ (Brand, Product Type, Fabric, Cutting, Shirt/Trouser details) to accommodate the wild inconsistency of vendor descriptions.
- **Profit Logic**: Confirmed. Global Fixed Flat Commission (e.g., PKR 1,000) applied to all products, with the ability to override specific products individually.
- **Price Formula**: Confirmed. Customer Price = Wholesale + Your Profit. Delivery charges are added as a **one-time flat fee per order** at checkout.

---

**Now, we officially shift gears to the VENDOR side.**

You mentioned the vendor needs a separate login and private order links. But I need the **exact workflow and permissions** for this vendor.

Answer these **5 specific questions** to lock in the Vendor User Story:

---

**1. Vendor Dashboard Scope:**
When the vendor logs in to `yoursite.com/vendor`, what does he see on his dashboard?

- Does he see **all orders from you** (his reseller) with a summary (Total Orders, Pending Dispatch, Total Commission he owes you)?
- Or does he just see a list of orders assigned to him, sorted by status (New → Dispatched → Delivered)?
- _My assumption:_ He sees a dedicated dashboard with a list of all orders you have forwarded to him, along with order statuses. Confirm.

---

**2. Vendor Permissions (Can he update statuses?):**
You (the admin) currently change order statuses (Pending → Confirmed → Shipped → Delivered).

- Should the vendor have the ability to **update the status** from his side as well (e.g., mark "Shipped" or "Delivered")?
- Or is the vendor purely a **viewer** – he just sees the order details, dispatches the physical goods, and **you** are the only one who updates the digital status in the system?
- _My assumption:_ For simplicity, only **you (admin)** update the status. The vendor is a **viewer only** to reduce confusion. Confirm.

---

**3. Vendor Order Detail Page:**
When the vendor clicks on a specific order, what exact details do you want him to see?

- Customer's **Name, Address, and Phone Number** (so he knows where to ship).
- List of **Products** ordered (names, quantities, images).
- **Total Amount the customer needs to pay** upon delivery (Your Selling Price + Delivery Charges).
- **Your Commission** (e.g., PKR 1,000) – so he knows exactly how much to pay you after delivery.
- **Wholesale Price** of the products (so he knows his base cost)?

_Crucially:_ Should the vendor see **your Selling Price** (what you charged the customer) alongside the **Wholesale Price** and your **Commission**, so he can verify the math? _(My assumption: Yes, show all three for transparency)._

---

**4. Product Management (Vendor Access):**
You mentioned you will manually add all products from the Admin side.

- Does the vendor have **zero access** to adding, editing, or hiding products?
- Or do you want him to have a "Submit Product Suggestion" feature where he can upload images and descriptions, and you (admin) approve/publish them?
- _My assumption:_ The vendor has **zero product management access** – it's strictly your job. Confirm.

---

**5. Commission Reconciliation & Payouts:**
When you mark an order as "Delivered" and then manually mark "Commission Received" from the Admin side:

- Should the vendor see a **"Payout History"** section in his dashboard, listing all commissions he has paid you (with dates and order IDs)?
- Should the vendor see a **"Pending Payout"** total (orders that are Delivered but not yet marked as Commission Received)?
- _My assumption:_ Yes, this builds trust and helps the vendor track his payables to you. Confirm.

---

Once you answer these 5 questions, I will have the **complete Vendor Blueprint**.

At that point, I will have **ALL** the necessary information (Customer Story + Admin Story + Vendor Story + Tech Stack decisions). Then, I will ask you one final time to pick your **definitive Tech Stack**, and immediately after that, I will generate your master prompt.

Proceed when ready!
Me:

1. Vendor Dashboard Scope:
   He sees a dedicated dashboard with

- all orders from me (his reseller) with a summary (Total Orders, Pending Dispatch, Total Commission he owes me)
- a list of all orders you have forwarded to him, along with order statuses. Confirm

2. Vendor Permissions (Can he update statuses?):

- he can only mark shipped, delivered, returned (because this is something he is actually dealing with, when the orders are shipped, he knows, and when he receives amount, he knows the order is delivered), so when he does updates it from there, the status will be automatically be updates here so I will know what amount he owes me now.

3. Vendor Order Detail Page:

- When the vendor clicks on a specific order, what exact details do you want him to see?
  -- Customer's Name, Address, and Phone Number (so he knows where to ship).
  -- List of Products ordered (names, quantities, images).
  -- Total Amount the customer needs to pay upon delivery (Your Selling Price + Delivery Charges).
  -- Your Commission (e.g., PKR 1,000) – so he knows exactly how much to pay you after delivery
  -- Wholesale Price of the products (so he knows his base cost)
  -- Should the vendor see your Selling Price (what you charged the customer) alongside the Wholesale Price and your Commission, so he can verify the math? Yes

4. Product Management (Vendor Access):

- The vendor has zero product management access

5. Commission Reconciliation & Payouts:

- When you mark an order as "Delivered" and then manually mark "Commission Received" from the Admin side:
  -- the vendor see a "Payout History" section in his dashboard, listing all commissions he has paid you (with dates and order IDs)
  -- the vendor see a "Pending Payout" total (orders that are Delivered but not yet marked as Commission Received)
  -- Yes, this builds trust and helps the vendor track his payables to you. Confirm.

on the vendor dashboard there is an input field where he puts order id, and gets to know the order details and I think admin, and vendor can see the same details so both know the math of this order

tell me if anything feels confusing
AI:
I have read every single word. Your vendor answers are **absolutely crystal clear**, and I completely understand the workflow now.

Let me summarize the key takeaway that I will bake into the prompt so there is zero confusion:

- **Vendor has limited but active permissions** – he can update statuses (Shipped, Delivered, Returned) because he physically handles the goods. This is a brilliant design because it reduces your manual workload—when he marks it "Delivered," you immediately see the order in your "Commission Pending" state.
- **Transparency is built-in** – both Admin and Vendor see identical financial math (Wholesale, Your Selling Price, Your Commission, Customer Total). This eliminates any disputes.
- **The Vendor Order Search** – an input field on his dashboard to instantly pull up any order by ID. Perfect for when you send him a private link or he just wants to double-check an older order.

**There is absolutely nothing confusing about this.** All three user stories (Customer, Admin, Vendor) are now **100% locked and complete.**

---

However, remember my standing rule from the very beginning: **I will NOT generate the prompt until you explicitly tell me to.**

Right now, we are at the **final decision point**.

We have the entire business logic, database schema (in my head), UI interactions, and user permissions mapped out. But the AI Agent in your IDE needs to know **which language/framework** to write everything in.

I gave you three options earlier. Please pick **one** definitive option right now:

- **Option A: Next.js (React + Node.js)** – Modern, single-page app feel, great for real-time updates. You'll need a VPS or Vercel.
- **Option B: Django (Python)** – "Batteries included." Comes with a built-in admin panel, ORM, and authentication. Very secure and quick to build admin dashboards.
- **Option C: Laravel (PHP)** – Extremely popular in Pakistan, easy to host on affordable shared hosting (like Hostinger or local Pakistani providers). Comes with built-in auth, ORM, and blade templating.

**My professional recommendation for your specific case:** Since you need two separate login panels (Admin + Vendor) with strict permissions, and you want an affordable hosting solution in Pakistan, **Laravel (Option C)** or **Django (Option B)** will save you the most development time because they handle user roles and admin CRUD out of the box. If you choose Next.js, the Agent will have to build authentication from scratch (which takes more code).

Please tell me **Option A, B, or C**, and also specify your preferred **Database** (e.g., MySQL, PostgreSQL, or SQLite for simplicity). Once you give me this final tech stack, I will confirm receipt and wait for your final command: **"Generate the prompt."**

Proceed when ready!
Me:
you are not going for even db schema, this will be done by agent
we will just tell agent what is that we want, and he will take care about how to do it.
I choose MERN stack with mongodb, we will later see where to deploy.
AI:
Absolutely. I fully understand.

- **Tech Stack locked:** MERN (MongoDB, Express.js, React.js, Node.js).
- **Architectural rule locked:** I will **never** tell the Agent _how_ to structure the database, write the queries, or organize the code. I will only describe _what_ the system must do, _how_ users interact with it, and _what_ business rules to enforce. The Agent is free to choose the schema, folder structure, and authentication library entirely autonomously.

---

Since we have now finalized **every single detail** (Customer Story, Admin Story, Vendor Story, Tech Stack, Business Logic, UI expectations), I have compiled the complete blueprint in my memory.

**Here is the final checklist of everything we locked in:**

- **Customer:** Homepage slider, Navbar (Catalog, About, FAQs, Contact, Cart, Track Order, Search), Product cards (clickable, with image/price/code/summary/Order Now/Add to Cart), Cart (LocalStorage, +/- quantities), Checkout/Order Now (generates order, public tracking link, WhatsApp template message).
- **Admin (You):** `/admin` login. Dashboard with widgets (orders breakdown, commissions, best-selling products). Product management (Add/Edit/Hide with flexible fields including auto-suggested Product Code based on Category+Color+Gender+parity). Order management (filterable list, status dropdown, copy vendor private link). Delivery settings (base charge + free threshold).
- **Vendor:** `/vendor` login. Dashboard with summaries, order list. Can update statuses (Shipped/Delivered/Returned). Can search orders by ID. Sees full order math (Wholesale, Your Selling Price, Your Commission, Customer Total). Sees Payout History and Pending Payouts.
- **Business Rules:** Global fixed flat commission + per-product override. Delivery is one-time per order. Fuzzy search. Manual "Commission Received" toggle.

---

**Now, I am strictly awaiting your final command.**

Please say: **"Generate the prompt."**

Once you give that command, I will write a single, massive, meticulously detailed prompt (no code, no architecture advice, just pure specifications) that your IDE Agent can read and immediately start building from.

I am ready. Just say the word.
Me:
first tell me is mongodb same as sql or other options?
AI:
My apologies for the language switch! Let me answer clearly in English.

**No, MongoDB is not the same as SQL databases like MySQL.** They are fundamentally different:

---

**Storage Structure:**

- **SQL (MySQL/PostgreSQL):** Data is stored in **tables** with fixed columns and rows. Every row must have the same fields. Changing the structure requires altering the entire table (migrations).
- **MongoDB:** Data is stored in **collections** as flexible **documents** (JSON-like objects). Different documents in the same collection can have different fields. This is perfect for your use case because vendor product descriptions are highly inconsistent—some have length, some have fabric details, some have shirt/trouser info. MongoDB lets you store whatever fields exist without forcing every product to have the same structure.

**Query Language:**

- SQL uses structured queries and often requires JOINs across multiple tables.
- MongoDB uses a JavaScript-like query language that works naturally with nested data (e.g., storing an order with all its products inside a single document).

**Scalability:**

- SQL scales vertically (bigger, more powerful server).
- MongoDB scales horizontally (add more regular servers to distribute data).

**Why MongoDB is perfect for your project:**
Your product descriptions are messy and inconsistent—MongoDB's flexible schema handles that effortlessly. Also, since you've chosen the **MERN stack** (MongoDB, Express, React, Node.js), everything uses JavaScript/JSON end-to-end, making development incredibly smooth.

---

### ✅ Final Status

We have **locked everything**:

- **Tech Stack:** MERN + MongoDB.
- **Customer Story:** Complete.
- **Admin Story:** Complete.
- **Vendor Story:** Complete.
- **Business Rules:** Complete.

**I am now formally waiting for your final command.**

Please say: **"Generate the prompt."**

Once you do, I will write the definitive, master prompt for your IDE Agent—no code, no architecture advice, just pure, detailed specifications of _what_ to build. The Agent will figure out the database schema, folder structure, and authentication entirely on its own, just as you requested.

Say the word, and I will generate it immediately.
Me:
we will use mongodb with prisma
AI:
**Noted and locked.**

**Tech Stack final update:** MERN Stack (MongoDB, Express.js, React.js, Node.js) with **Prisma** as the ORM/ODM layer for MongoDB.

_(This is an excellent choice—Prisma gives you type safety, schema migrations, and a clean query API even with MongoDB's flexible document model. The Agent will handle the `schema.prisma` file and the `mongodb` provider configuration entirely on its own.)_

---

**Everything is now 100% finalized:**

- ✅ Customer Experience (full UI flow, cart, search, tracking)
- ✅ Admin Experience (dashboard, product management, order management, delivery settings, commission tracking)
- ✅ Vendor Experience (dashboard, status updates, financial transparency, payout history)
- ✅ Business Logic (global flat commission + per-product override, one-time delivery fees, fuzzy search)
- ✅ Tech Stack (MERN + MongoDB + Prisma)

**I have the complete blueprint in my memory.**

---

**I am now formally waiting for your final command.**

Please say exactly: **"Generate the prompt."**

Once you do, I will produce the single, definitive, production-grade master prompt for your AI Agent—without a single line of code or architectural instruction, purely a detailed specification of _what_ this system must do and _how_ each user interacts with it. The Agent will autonomously decide the schema, file structure, authentication, and implementation approach.

Say the word, and I will generate it immediately.
Me:
before that explain me the project in a very well detailed and formal manner
AI:
Absolutely. Here is the complete, formal, and highly detailed **Project Specification Document** for your new venture.

---

# Project Specification: Al Ameen Collective – E-commerce Dropshipping Platform

---

## 1. Executive Summary

**Al Ameen Collective** is a web-based e-commerce reselling platform designed to bridge the gap between a wholesale cloth vendor (based in Faisalabad) and a network of online customers.

The platform operates on a **zero-inventory dropshipping model**. The Vendor holds the physical stock and handles shipping and payment collection, while the Admin (You) acts as the digital reseller. You market the Vendor's products via the website, take customer orders, forward them to the Vendor, and earn a fixed commission per order.

The system is a full-stack web application that supports three distinct user roles: **Customer** (shopping/buying), **Admin** (you – managing products, orders, and profits), and **Vendor** (the supplier – managing shipping updates and financial reconciliation).

---

## 2. Core Business Logic & Financial Model

- **Dropshipping Principle:** The Admin does not hold any physical inventory. The Vendor solely handles inventory, shipping, and payment collection from the customer at the time of delivery (Cash on Delivery or direct bank transfer).
- **Pricing Formula (Customer Price):**
  - **Customer Total Payable** = (Wholesale Price + Admin Profit) + Delivery Charges.
  - _Note: Delivery charges are added as a one-time, flat fee per order (not per product)._
- **Admin Profit (Commission):** A **Fixed Flat Amount** (e.g., PKR 1,000) applied globally to every product. However, the Admin has the ability to **override this amount per specific product** (e.g., increasing commission on premium items or decreasing it on fast-moving, cheap items).
- **Commission Reconciliation:** The Admin is paid the commission by the Vendor only after the Vendor confirms the order has been physically "Delivered." The Admin manually confirms receipt of the commission in the system, which updates the Pending/Paid status for the Vendor.

---

## 3. User Roles & Detailed Responsibilities

### 3.1. Customer (The Buyer)

The customer interacts with the public-facing website. They do not need to log in.

**Navigation & UI Components:**

1.  **Top Ribbon (Alert Bar):** A minimal black bar with sliding white text used for promotional alerts (e.g., "Free Delivery on Orders above PKR 9,999", "Sale Live!").
2.  **Navigation Bar:** Primary color `#DBB177` with font `#510F17`. Contains:
    - **Logo:** _Al Ameen Collective_ (left-aligned, vertically centered).
    - **Menu Items:** Catalog, About, FAQs, Contact, Cart, Track Order, and a Search Bar (right-aligned).
3.  **Catalog & Search:**
    - Clicking "Catalog" or the Search Bar navigates the user to the full product listing page.
    - **Filters:** Dynamic filter buttons derived from product categories (e.g., _Lawn_, _Summer_, _Embroidered_).
    - **Fuzzy Search:** The search bar must handle typos (e.g., searching "laun" should return results for "lawn") using a library like Fuse.js.
4.  **About, FAQs, & Contact:** These menu items scroll the user to the respective sections in the Footer.
    - **FAQs:** Expandable accordion-style dropdowns. Contains policies like Return Policy, Order Checking, Wrong/Faulty Orders.
    - **Contact:** Shows the Admin's WhatsApp number for direct queries.
5.  **Track Order:** A dedicated page where the customer inputs their Order ID to view the public-facing status of their order (Pending, Confirmed, Shipped, Delivered, Cancelled, etc.).

**Product Browsing & Cart:**

- **Product Cards:** Displayed in a white-background grid with light shadows.
  - Visible on card: Product Image, Product Price (Admin’s selling price), Product Code (unique), Catchy Summary.
  - **Interactivity:** The entire card is clickable, serving as the "Details" button.
- **Product Detail Page:** Upon clicking a card, the user sees the Full Description, specific attributes (Length, Fabric, Shirt/Trouser details, etc.). Below the details, a **"Similar Products"** section displays items that share similar categories or tags.
- **Add to Cart:** Products are added to a cart stored in the browser's **LocalStorage**. The cart persists even after the user leaves the website.
  - Cart interface: Vertical list with +/- buttons to adjust quantities. Reducing quantity to zero removes the item.
- **Order Now (Single Item):** Clicking this bypasses the cart. It creates an order for exactly 1 unit of that specific product and immediately redirects to the checkout form.
- **Checkout (Multi-Item):** Allows multiple products with varying quantities. Total price includes the sum of all (Wholesale + Profit) plus delivery charges.

**Order Submission Workflow:**

- The customer fills out a form containing: Full Name, Phone Number, WhatsApp Number, Address, and optional remarks.
- Upon submission:
  1.  The order is saved in the database with a unique Order ID.
  2.  A **Public Tracking Link** (e.g., `website.com/track/ORDERID`) is generated for the customer.
  3.  The customer's WhatsApp opens automatically with a pre-filled template message sent to the Admin, containing the customer's details and the product ordered (without the price, just the item details). The Admin reviews this message before manually forwarding it to the Vendor.

---

### 3.2. Admin (You – The Reseller)

The Admin is the single owner/operator of the platform, accessible via a login at `website.com/admin`.

**Dashboard & Analytics:**

- **Widgets:** Total Orders, Pending Orders, Confirmed Orders, Delivered Orders, Cancelled Orders, Filed for Return, Returned Orders.
- **Financial Widgets:** Total Commission Earned (from Delivered orders), Total Commission Pending (from Confirmed/Shipped orders).
- **Product Performance:** A list of products sorted from **Most Sold** to **Least Sold**, and another list sorting **Least Returns** to **Most Returns**.

**Product Management (Catalog):**

- **Add New Product:** The Admin uses a dynamic form.
  - _Mandatory Fields:_ Product Name, Category/Tags, Gender, Color, Wholesale Price, Catchy Summary, Full Description, Multiple Images (drag-and-drop).
  - _Optional Fields (for flexibility):_ Brand, Fabric Type, Product Type (2PC Suit, Single Shirt, etc.), Cutting/Size, Shirt Details, Trouser Details. _(The system is designed to accommodate the highly inconsistent descriptions sent by the Vendor, allowing the Admin to enter only what is available)._
  - **Product Code Auto-Generation:** The system auto-generates a meaningful code based on **Category + Color + Gender**.
    - _Logic:_ Even numbers appended indicate **Female**; Odd numbers indicate **Male**. (e.g., `LWN-RD-0018` for Lawn-Red-Female, `WW-BL-1023` for Washnwear-Blue-Male). The Admin can edit this suggested code before saving.
- **Edit Product:** Admin can update any field, replace images, and modify the commission override.
- **Hide Product:** A simple Toggle (Active/Inactive). If Inactive, the product is completely hidden from the customer catalog.

**Order Management:**

- **Order List:** A filterable table/list with columns: Order ID, Customer Name, Total Amount, Status, Date, and a "Update Status" action button.
- **Status Update:** The Admin can change the status using a dropdown with the options: _Confirm Order, Order Shipped, Order Delivered, Cancel Order, Filed for Return, Order Returned_.
- **Vendor Coordination:** For every confirmed order, the Admin has a **"Copy Vendor Link"** button (with a copy-to-clipboard icon that provides visual feedback like a "tick"). The Admin pastes this link into WhatsApp and sends it to the Vendor.
  - _Note:_ This is in addition to the Vendor having a direct login.

**Configuration (Settings Page):**

- **Delivery Charges:** A dedicated settings page allows the Admin to set:
  - Base Delivery Charge (e.g., PKR 250).
  - Free Delivery Threshold (e.g., "Free if order total > PKR 9,999") with an On/Off toggle.

---

### 3.3. Vendor (The Supplier)

The Vendor has a separate login at `website.com/vendor`. The Vendor does not manage products—only the operational logistics of orders.

**Dashboard:**

- **Overview Widgets:** Total Orders, Pending Dispatch, and Total Commission owed to the Admin (You).
- **Order List:** A filterable list of all orders placed through the Admin.
- **Search Functionality:** An input field on the dashboard where the Vendor can enter an Order ID to instantly pull up order details.

**Order Detail View (Transparency):**
When the Vendor clicks an order, they see a complete breakdown to eliminate financial disputes:

- Customer Name, Address, and Phone Number.
- List of Products ordered (Names, Quantities, Images).
- **Financial Math:**
  - Wholesale Price (Vendor's base cost).
  - Your Selling Price (What the Customer pays).
  - Admin Commission (Your Profit - e.g., PKR 1,000).
  - Customer Total Payable (Selling Price + Delivery Charges).

**Order Status Permissions:**
The Vendor can update the status of an order, but only for the physical handling steps:

- **Mark as Shipped** (Vendor dispatches the goods).
- **Mark as Delivered** (Vendor collects the cash from the customer).
- **Mark as Returned** (Customer returns the item).

_When the Vendor marks an order as "Delivered," it triggers the Admin's dashboard to show this order as eligible for "Commission Received."_

**Commission Reconciliation (Payouts):**

- **Payout History:** A log listing all commissions the Vendor has paid to the Admin, with dates and Order IDs.
- **Pending Payouts:** A dedicated widget showing the total amount of commissions the Vendor currently owes the Admin (orders that are marked "Delivered" but not yet marked "Commission Received" by the Admin).

---

## 4. Technical Specifications & Constraints

- **Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js).
- **Database ORM/ODM:** Prisma (configured with MongoDB as the provider).
- **Authentication:** Separate role-based authentication for Admin and Vendor. The Agent is responsible for implementing secure JWT/session-based login flows.
- **Cart Persistence:** Strictly reliant on the browser's **LocalStorage**. No account is required for customers.
- **Search Logic:** Implementation of **Fuzzy Search** (e.g., Fuse.js) to handle typos in the product catalog.
- **Hosting & Environment:** Deployability is a future discussion; the Agent is to prioritize building the application, ensuring that environment variables (Database URL, JWT Secret, etc.) are easily configurable.

---

## 5. Conclusion

This platform automates the lead generation, order tracking, and financial reconciliation between the Reseller (Admin), the Supplier (Vendor), and the End-Customer. The Agent will build this from scratch, deciding on the database schema (e.g., Product collections, Order collections, User roles), API architecture, and UI framework independently, strictly adhering to the detailed user interactions and business logic described above.

---

**We are now 100% finalized.**
I am now ready to receive your command: **"Generate the prompt."**
Me:
We will follow the agile methodology for our project completion like real software engineers in a real software house work
AI:
Excellent call. Real software houses don't build monolithic spaghetti; they build iteratively, feature by feature, with continuous feedback.

Since I am generating a single, comprehensive prompt for an AI Agent (rather than managing a team of human engineers), I will **embed the Agile philosophy directly into the prompt's structure**.

Here is exactly how I will translate "Agile Methodology" for the AI Agent:

**1. Define Clear Epics & User Stories (In the Prompt)**
Instead of giving one massive block of requirements, I will structure the prompt into **numbered Epics** with clear acceptance criteria. The Agent will be explicitly instructed to build in this priority order:

- **Epic 0: Foundation & Setup** – Database connection, authentication scaffolding, folder structure, environment variables.
- **Epic 1: The Customer MVP (Minimum Viable Product)** – Catalog display, product cards, search, fuzzy logic, "Order Now" form, WhatsApp template, and LocalStorage cart. (This is the core revenue generator).
- **Epic 2: The Admin Backend** – Admin login, Dashboard widgets, Product CRUD (Add/Edit/Hide), Order list & status updates, Delivery settings, and commission tracking.
- **Epic 3: The Vendor Portal** – Vendor login, Order list, Status updates (Shipped/Delivered/Returned), Payout history, and financial transparency.
- **Epic 4: Polish & Cross-Cutting Concerns** – Public tracking links, private vendor links, copy-to-clipboard functionality, and responsive design.

**2. Instruct Modular, Iterative Development**
I will explicitly tell the Agent: _"Build the application in layers. Ensure the backend API is fully functional and tested via Postman/Insomnia before wiring it to the React frontend. Write modular, well-commented code so that features can be added or modified in future sprints without breaking existing functionality."_

**3. Future-Proofing for Technical Debt**
I will instruct the Agent to leave "hooks" for future automation (like email/SMS notifications or payment gateway integration) without implementing them now—so that when you're ready for Sprint 2 or 3, the codebase can easily accommodate new features.

---

**My question to you before I generate the final prompt:**

Do you want me to explicitly prioritize **Epic 1 (Customer MVP)** as the very first working deliverable—meaning the Agent builds the customer-facing catalog and order placement _first_, and treats the Admin/Vendor dashboards as secondary features to be added on top?

_(My assumption: Yes—you want to start showing products to customers and taking orders as soon as possible, even if the admin panel is basic initially)._

Please confirm this prioritization, or tell me if you want all Epics built in parallel from day one. Once you answer this final question, I will immediately generate the Agile-ready, Epic-structured prompt for your Agent.

Just say the word!
Me:
I don;t want you to tell the agent to break it into how many or which sprints I just want you to tell it to follow the agile methodology and plan sprints and everything by itself, we are not going to tell it how to do his work
we are just going to tell it what is it that we want
it will move not start development until I say so, and when I say to move forwards like sprint n it will work on that sprint
AI:
**Perfectly understood and accepted.**

I will **not** dictate sprint structure, timeline, or development phases to the Agent.

The prompt will simply state:

- _"You must follow Agile methodology. Plan your own sprints, break down the requirements into manageable iterations, and build incrementally."_
- _"Do NOT start development until the user explicitly authorizes you to proceed with a specific sprint. The user will give you a command like 'Start Sprint 1' or 'Proceed to next sprint.'"_
- _"At the end of each sprint, provide a clear summary of what was completed and ask for authorization before moving to the next sprint."_

---

**Final Checklist Before Prompt Generation:**

✅ Customer Story (Complete)
✅ Admin Story (Complete)
✅ Vendor Story (Complete)
✅ Business Logic (Complete)
✅ Tech Stack: MERN + MongoDB + Prisma (Complete)
✅ Development Philosophy: Agile, Self-Planned Sprints, User-Authorized Progression (Complete)

---

**I am now formally, officially, and absolutely ready to generate your master prompt.**

Please say the exact words: **"Generate the prompt."**

Once you do, I will produce the single, definitive, production-grade specification for your AI Agent—crafted with every detail we discussed, structured for Agile execution, and devoid of any architectural instructions or code. The Agent will autonomously decide everything else.

**Say the word.**
Me:
Generate the prompt
AI:

# MASTER PROMPT FOR AI AGENT

---

## PROJECT OVERVIEW

### System Purpose

You are building **Al Ameen Collective** – a full-stack e-commerce dropshipping platform that enables a reseller (Admin) to sell products from a wholesale cloth vendor (Vendor) to end customers (Customers). The system operates on a zero-inventory model where the Admin markets products, takes orders, forwards them to the Vendor, and earns commission on each sale.

### Key Facts

- **Business Location:** Pakistan (Currency: PKR)
- **Business Model:** Dropshipping / Reselling
- **Admin:** The user (reseller) who manages the website and earns commission
- **Vendor:** The cloth shop owner who holds inventory, ships products, and collects payments
- **Customer:** End buyers who purchase products through the website
- **Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js) with Prisma ORM
- **Development Approach:** Agile methodology – you will plan your own sprints, build incrementally, and request authorization before starting each sprint

---

## DEVELOPMENT PHILOSOPHY

### Agile Methodology

- You must follow Agile principles throughout development
- Break down the project into logical sprints (you decide the structure)
- Build incrementally, delivering working functionality at each sprint
- **DO NOT** start writing code until the user explicitly authorizes you to proceed
- After each sprint, provide a clear summary of what was completed
- Explicitly ask the user for authorization before moving to the next sprint
- Be transparent about dependencies and challenges

### Modular Architecture

- Build the application with clean, modular, well-commented code
- Separate concerns (frontend, backend API, database models, authentication)
- The user should be able to add features in future without breaking existing functionality
- Leave appropriate "hooks" for future automation (email/SMS notifications, payment gateways, etc.)

### Quality Standards

- Write production-ready, maintainable code
- Implement proper error handling and validation
- Ensure responsive design (mobile-friendly)
- Follow security best practices (authentication, authorization, input sanitization)
- The user should not need to touch code for daily operations

---

## USER ROLES & INTERACTIONS

### ROLE 1: CUSTOMER (The Buyer)

The customer accesses the public-facing website. They do not need to log in or create an account. Their journey must be seamless and intuitive.

#### 1.1 Homepage & Navigation

**Top Ribbon (Alert Bar):**

- Minimalistic black background
- White text centered horizontally
- Multiple alerts slide automatically (left to right or sliding carousel effect)
- One alert is displayed at a time; it slides out to the left as the next slides in from the right
- Purpose: Display promotional messages (e.g., "Free Delivery on Orders above PKR 9,999", "Sale Live!", "New Collection Arrived")
- Initially, only generic alerts will be shown; Admin will manage these later

**Navigation Bar:**

- Background Color: `#DBB177`
- Font Color: `#510F17`
- Layout (Left to Right):
  - **Left:** Logo "Al Ameen Collective" (vertically centered)
  - **Center (Right-aligned):** Catalog | About | FAQs | Contact | Cart | Track Order | Search Bar

**Navigation Behaviors:**

- **Catalog:** Clicking navigates to the full product listing page with filters
- **About:** Scrolls down to the About section in the footer
- **FAQs:** Scrolls down to the FAQ section in the footer
- **Contact:** Scrolls down to the Contact section in the footer (shows Admin's WhatsApp number)
- **Cart:** Navigates to the shopping cart page
- **Track Order:** Navigates to the order tracking page where customers enter their Order ID
- **Search Bar:**
  - Located in the navbar and also on the catalog page
  - Both function identically
  - If searched from navbar, automatically navigates to catalog page showing results
  - Supports fuzzy search (handles typos like "laun" → "lawn")

#### 1.2 Catalog Page (Product Listing)

**Filters:**

- Dynamic filter buttons derived from product categories
- When Admin adds a new product with a new category, that category automatically appears as a filter
- Clicking a filter shows only products with that category/tag
- Filters are displayed as clickable buttons (e.g., "Lawn", "Summer", "Embroidered", "Men", "Women")

**Search Bar (Catalog-specific):**

- Same functionality as navbar search
- Supports fuzzy search (implement using Fuse.js or similar lightweight library)
- Search results should be relevant even with spelling mistakes

**Product Cards Display:**

- Background: White
- Cards have a subtle light shadow
- Each card displays:
  - Product Image
  - Product Price (Admin's selling price)
  - Product Code (unique identifier, no two products share the same code)
  - Summarized/Catchy Details (short description)
- **Card Interaction:** The entire card is clickable and serves as the "Details" button
- Clicking the card navigates to the Product Detail Page
- Each card also has:
  - **Order Now** button (single item, quantity = 1)
  - **Add to Cart** button (adds product to cart with quantity = 1)

#### 1.3 Product Detail Page

When a customer clicks a product card, they see:

- Full product description (all details from the Admin's entry)
- Product images (multiple, gallery-style)
- Product attributes (Fabric, Length, Cutting, Shirt/Trouser details, etc. – whatever the Admin entered)
- Product Price
- Product Code
- **Order Now** button (single item, quantity = 1)
- **Add to Cart** button
- **Similar Products Section:**
  - Below the product details
  - Shows products with similar categories/tags or descriptions
  - Different product codes (not the same product)

#### 1.4 Shopping Cart

**Cart Storage:**

- Stored in browser's LocalStorage
- Persists even after the user leaves the website
- Only removed when the user manually deletes items

**Cart Interface:**

- Vertical list of products added
- For each product:
  - Product Image (thumbnail)
  - Product Name/Summary
  - Price per unit
  - Quantity selector (+ and - buttons)
  - "Remove" option (if quantity reaches 0 via - button, product is auto-removed)
- Total price (sum of all products)
- **Checkout** button (proceeds to checkout with multi-item order)

#### 1.5 Checkout & Order Submission

**Order Now (Single Item):**

- Bypasses the cart entirely
- Creates an order for exactly 1 unit of that specific product
- Immediately redirects to the Checkout Form

**Checkout (Multi-Item from Cart):**

- Allows multiple products with varying quantities
- Total price = sum of (Wholesale Price + Admin Profit) for all items
- Delivery charges added as a one-time flat fee per order

**Checkout Form Fields (All Required):**

- Full Name
- Phone Number
- WhatsApp Number
- Address
- Optional: Additional remarks/notes

**Form Submission Behavior:**
Upon clicking the final order button:

1. **Order is saved in database** with a unique Order ID
2. **Public Tracking Link** generated: `yoursite.com/track/[ORDER-ID]`
   - This link shows the customer their order status
   - Displays: Order ID, Product image, Product total price, Delivery charges, Grand total (customer pays upon delivery)
   - Shows order status: Pending, Confirmed, Shipped, Delivered, Cancelled, Filed for Return, Returned
3. **WhatsApp Integration:**
   - Customer's WhatsApp opens automatically
   - Pre-filled template message sent to Admin's WhatsApp number
   - Contains: Customer details (Name, Address, Phone), Product details (what they ordered, quantity)
   - **IMPORTANT:** Product price is NOT included in this WhatsApp message (Admin manually handles pricing with Vendor)
   - Message is pre-filled and waiting for customer's final confirmation to send

#### 1.6 Order Tracking Page

- Dedicated page accessed via "Track Order" in navbar
- Input field: Enter Order ID
- **Track Order** button
- Upon submission, displays:
  - Order details (products, quantities, images)
  - Current status (Pending, Confirmed, Shipped, Delivered, Cancelled, Filed for Return, Returned)
  - Customer total payable
  - Delivery charges
  - Timestamps (order date, status update dates)

---

### ROLE 2: ADMIN (You – The Reseller/Business Owner)

The Admin is the single owner/operator of the platform. Accessible via login at `yoursite.com/admin`. The Admin has full control over products, orders, commissions, and delivery settings.

#### 2.1 Admin Login

- Dedicated login page at `/admin`
- Secure authentication (JWT-based or session-based)
- Only one Admin user (you)
- Credentials managed via environment variables or database seed

#### 2.2 Admin Dashboard

**Analytics Widgets (Top Section):**
Displayed as cards with numbers:

- Total Orders (all time)
- Pending Orders (orders awaiting Admin action)
- Confirmed Orders (orders forwarded to Vendor, awaiting shipping)
- Shipped Orders (dispatched by Vendor)
- Delivered Orders (completed)
- Cancelled Orders
- Filed for Return
- Returned Orders

**Financial Widgets:**

- Total Commission Earned (from Delivered orders where Commission Received = TRUE)
- Total Commission Pending (from Delivered orders where Commission Received = FALSE)
- Potential Earnings (from Confirmed/Shipped orders not yet delivered)

**Product Performance Section (Below Widgets):**

- List of products sorted: **Most Sold → Least Sold**
- List of products sorted: **Least Returns → Most Returns**

**Recent Orders:**

- Quick view of the last 10 orders

#### 2.3 Product Management

**Add New Product:**

The Admin uses a dynamic form with the following fields:

_Mandatory Fields:_

- Product Name
- Category/Tags (e.g., Lawn, Summer, Embroidered, Men, Women, Kids – multiple tags allowed)
- Gender (Male / Female / Unisex)
- Color (dropdown or text input)
- Wholesale Price (PKR – the Vendor's price)
- Catchy Summary (short description for product card)
- Full Description (detailed product description)
- Multiple Images (drag-and-drop upload, at least 1 required)

_Optional Fields (Flexible):_

- Brand / Collection (e.g., Nishat, Alkaram, etc.)
- Product Type (dropdown: 2PC Suit, 3PC Suit, Single Shirt, Single Trouser, Unstitched Fabric, Other)
- Fabric Type (e.g., Lawn, Cotton, Khadar, Silk)
- Cutting / Size (e.g., 3.5 Gaz, 30x30 Inches, M/L)
- Shirt Details (textarea – for describing shirt-specific details)
- Trouser Details (textarea – for describing trouser-specific details)

_Why Optional Fields Exist:_ Vendor descriptions are highly inconsistent. Some products have length, some have fabric details, some have shirt/trouser-specific details. The Admin should be able to enter whatever is available and leave the rest blank.

**Product Code Auto-Generation:**

- System automatically generates a meaningful suggested code based on:
  - Category (abbreviated, e.g., LWN = Lawn, WW = Wash n Wear)
  - Color (abbreviated, e.g., RD = Red, BL = Blue, MT = Multicolor)
  - Gender parity: Even numbers = Female, Odd numbers = Male
- Example: `LWN-RD-0018` = Lawn, Red, Female (even number)
- Example: `WW-BL-1023` = Wash n Wear, Blue, Male (odd number)
- Admin can **edit** this suggested code before saving
- No two products can have the same Product Code (must be unique)

**Edit Product:**

- Admin can update any field
- Replace/add images
- Modify commission override (see Commission section below)

**Hide/Unhide Product:**

- Simple Toggle button (Active/Inactive) in the product list
- **Inactive:** Product disappears completely from customer catalog
- **Active:** Product appears in customer catalog

**Product List View:**

- Table displaying all products
- Columns: Product Code, Product Name, Category, Wholesale Price, Selling Price, Status (Active/Inactive), Actions (Edit, Toggle Active/Inactive)

#### 2.4 Order Management

**Order List:**

- Filterable table/list of all orders
- Columns: Order ID, Customer Name, Total Amount, Status, Date, Actions

**Filters:**

- Dropdown filter by Status (All, Pending, Confirmed, Shipped, Delivered, Cancelled, Filed for Return, Returned)
- Date range filter (optional)

**Order Detail View:**
When Admin clicks on a specific order:

- Customer Details: Full Name, Phone, WhatsApp, Address
- Product Details: List of products ordered (names, quantities, images, individual prices)
- Financial Breakdown:
  - Wholesale Price (Vendor cost)
  - Your Selling Price (Wholesale + Admin Profit)
  - Admin Commission (your profit)
  - Delivery Charges
  - Customer Total Payable (Selling Price + Delivery Charges)
- Order Status
- **Update Status** dropdown button with options:
  - Confirm Order
  - Order Shipped
  - Order Delivered
  - Cancel Order
  - Filed for Return
  - Order Returned
- **Commission Received** button/toggle (manually marked after Vendor pays you)
- **Copy Vendor Link** button (with copy-to-clipboard functionality)
  - Generates a private URL for the Vendor: `yoursite.com/vendor/order/[ORDER-ID]`
  - Clicking copies to clipboard with visual feedback (icon changes to tick, shows "Copied!" message)
  - Admin pastes this link into WhatsApp to send to Vendor

#### 2.5 Delivery Configuration

**Settings Page:**

- Dedicated page in Admin panel for delivery settings
- **Base Delivery Charge:** Input field (e.g., PKR 250)
- **Free Delivery Threshold:**
  - Enable/Disable toggle
  - Input field: "Free delivery if order total exceeds PKR [ ]"
- Delivery charges are added as a **one-time flat fee per order** (not per product)

#### 2.6 Commission Management

**Global Commission Setting:**

- Default: Fixed Flat Amount (e.g., PKR 1,000)
- Applied to every product by default

**Per-Product Commission Override:**

- Admin can override the global commission for specific products
- E.g., Premium products may have higher commission (PKR 1,500)
- Cheap/fast-moving items may have lower commission (PKR 500)

**Commission Formula:**

- **Admin Selling Price** = Wholesale Price + Admin Commission
- **Customer Total** = Sum of (Wholesale + Commission) for all products + Delivery Charges

**Commission Tracking:**

- When Admin marks an order as **"Delivered"**, it appears in "Commission Pending"
- Admin clicks **"Commission Received"** manually after Vendor pays
- Once clicked, it moves to "Commission Earned"
- Dashboard widgets update automatically

#### 2.7 Admin Navigation Structure

- Dashboard (default view after login)
- Orders
  - All Orders (list view)
  - Order Details (click-through)
- Products
  - All Products (list view)
  - Add Product
  - Edit Product (click-through)
- Delivery Settings (single page)
- Profile/Logout

---

### ROLE 3: VENDOR (The Supplier/Cloth Shop Owner)

The Vendor has a separate login at `yoursite.com/vendor`. The Vendor does NOT manage products. They only handle operational logistics and financial reconciliation.

#### 3.1 Vendor Login

- Dedicated login page at `/vendor`
- Secure authentication (JWT-based or session-based)
- Separate from Admin login
- Credentials managed by Admin (Admin can create or reset Vendor password)

#### 3.2 Vendor Dashboard

**Overview Widgets (Top Section):**

- Total Orders (all orders from this Admin/Reseller)
- Pending Dispatch (orders marked Confirmed but not yet Shipped)
- Total Commission Owed to Admin (from Delivered orders where Commission not yet paid)

**Order List:**

- Table/list of all orders forwarded to this Vendor
- Columns: Order ID, Customer Name, Total Amount (Customer Payable), Status, Date
- Filterable by status

**Search Functionality:**

- Input field on dashboard: "Search by Order ID"
- Instantly pulls up order details when entered

#### 3.3 Vendor Order Detail View (Financial Transparency)

When Vendor clicks on a specific order, they see a complete breakdown to eliminate disputes:

- **Customer Details:** Name, Address, Phone Number (for shipping)
- **Product Details:** List of products (names, quantities, images)
- **Financial Breakdown (Clearest Possible):**
  - Wholesale Price (Vendor's base cost)
  - Admin Commission (Your Profit)
  - Selling Price (What Customer Pays = Wholesale + Commission)
  - Delivery Charges (one-time flat fee)
  - Customer Total Payable (Selling Price + Delivery Charges)

#### 3.4 Vendor Order Status Permissions

The Vendor can update statuses for physical handling steps only:

- **Mark as Shipped** (Vendor dispatches goods to customer)
- **Mark as Delivered** (Vendor collects payment from customer)
- **Mark as Returned** (Customer returns item)

**Workflow:**

1. Admin marks order as "Confirmed"
2. Vendor sees "Confirmed" order in their list
3. Vendor dispatches goods → clicks **"Mark as Shipped"**
4. Vendor collects payment → clicks **"Mark as Delivered"**
5. Admin's dashboard now shows this order in "Commission Pending"
6. Admin receives payment from Vendor → clicks "Commission Received"
7. Vendor's dashboard shows this order in "Payout History" (Commission marked as Paid)

#### 3.5 Commission Reconciliation (Payouts)

**Payout History:**

- Log/list of all commissions paid to Admin
- Shows: Order ID, Date, Amount, Status (Paid)
- This builds trust and helps Vendor track payables

**Pending Payouts Widget:**

- Total amount of commissions currently owed to Admin
- Based on orders that are "Delivered" but not yet marked "Commission Received"
- Vendor can see exactly what they owe at a glance

#### 3.6 Vendor Navigation Structure

- Dashboard (default view after login)
- Orders (list view with filter)
- Order Details (click-through)
- Payout History
- Logout

---

## BUSINESS RULES & LOGIC

### Pricing & Financial Calculations

**Customer Payable Formula:**

```
Customer Total = SUM(Wholesale Price + Admin Commission for each product) + Delivery Charges
```

**Commission Logic:**

- **Global Default:** Fixed Flat Amount (configurable by Admin, e.g., PKR 1,000)
- **Per-Product Override:** Admin can set a specific commission amount for any product, overriding the global default
- **Commission Received:** Manually marked by Admin after Vendor pays

**Delivery Charges Logic:**

- One-time flat fee per order (not per product)
- Base charge configurable by Admin (e.g., PKR 250)
- Free Delivery Threshold configurable:
  - Toggle: Enable/Disable
  - Threshold amount: "Free if order total exceeds PKR X"
- Applied at checkout based on current configuration

### Product Management Rules

- **Product Code Uniqueness:** No two products can have the same Product Code
- **Product Code Auto-Generation:** Based on Category + Color + Gender (even = Female, odd = Male)
- **Optional Fields:** Admin can leave fields blank; system must handle missing data gracefully
- **Image Storage:** At least 1 image required per product; multiple images allowed
- **Product Hiding:** Inactive products must not appear anywhere in customer catalog (including search, filters, and similar products)

### Order Management Rules

- **Order ID Uniqueness:** Every order must have a unique Order ID
- **Public Tracking Link:** Any user can access `yoursite.com/track/[ORDER-ID]` without login
- **Vendor Private Link:** `yoursite.com/vendor/order/[ORDER-ID]` – accessible only by logged-in Vendor
- **Order Status Flow (Admin Side):**
  ```
  Pending → Confirmed → Shipped → Delivered → [End]
                    ↓          ↓
                 Cancelled   Returned (Filed for Return → Returned)
  ```
- **Order Status Flow (Vendor Side):**
  - Can only update: Pending → Shipped → Delivered → Returned
  - Cannot change statuses that would bypass Admin (e.g., cannot Confirm orders)

### Search & Discovery Rules

- **Fuzzy Search:** Implemented across product name, summary, description, categories, and tags
- **Filtering:** Dynamic filters derived from product categories/tags
- **Combined Search:** If user searches from navbar, they are redirected to catalog page with results

### Cart & Checkout Rules

- **Cart Storage:** Browser LocalStorage only (no database persistence for carts)
- **Cart Persistence:** Remains even after user closes browser (does NOT require login)
- **Checkout Flow:** Single-item Order Now bypasses cart; Cart Checkout handles multiple items
- **Order Form:** All customer details are required (Name, Phone, WhatsApp, Address)

---

## TECHNICAL SPECIFICATIONS

### Tech Stack

- **Frontend Framework:** React.js (or Next.js, decide yourself)
- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB
- **ORM/ODM:** Prisma with MongoDB provider
- **Authentication:** JWT-based (or session-based, choose the most appropriate)
- **Fuzzy Search:** Implement using Fuse.js or similar lightweight library
- **Image Storage:** Implementation decided by you (local storage, cloud storage, or MongoDB GridFS)
- **Styling:** Responsive, mobile-friendly design (framework of your choice, e.g., Tailwind CSS, Material-UI, or custom CSS)

### Environment Variables (Required)

The following configuration must be managed via environment variables:

- Database connection URL (MongoDB)
- JWT Secret Key
- Admin credentials (or seed script)
- Vendor credentials (or seed script)
- WhatsApp number (Admin's number for order notifications)
- Base URL (for generating tracking links)
- Any API keys (if using external services)

### Security Requirements

- Admin and Vendor routes must be protected with authentication
- Passwords must be hashed (bcrypt or similar)
- Input validation and sanitization on all forms
- CSRF protection (if using session-based auth)
- Helmet.js or similar for HTTP header security
- Rate limiting on authentication endpoints

### Deployment Readiness

- Build for production (optimized assets, environment variables separation)
- Provide clear instructions for deployment (deployment platform decided later)
- Database migration/seeding scripts
- Clear documentation in code comments

---

## DEVELOPMENT CONSTRAINTS

### What You MUST Do

1. **Follow Agile methodology** – plan your own sprints, build incrementally
2. **Ask for authorization** before starting each sprint
3. **Provide clear summaries** after each sprint
4. **Write clean, modular, well-commented code**
5. **Build the backend API first** (or alongside frontend, but ensure API is solid before full frontend integration)
6. **Implement proper error handling** – if something fails, user should see a user-friendly message
7. **Responsive design** – must work on mobile phones, tablets, and desktops

### What You MUST NOT Do

1. **DO NOT** start writing code without explicit authorization
2. **DO NOT** deviate from the business logic described above without asking the user
3. **DO NOT** build features that were not requested (avoid scope creep)
4. **DO NOT** assume the user knows technical jargon – ask clarifying questions if needed
5. **DO NOT** over-engineer – build what's requested, not what you think might be needed later

### What You Can Ask The User

- API keys for external services (if any)
- Clarification on ambiguous requirements
- Confirmation before proceeding to next sprint
- Decision on implementation choices (e.g., image storage solution)

---

## DELIVERABLES PER SPRINT

You decide the sprint structure. However, each sprint should typically include:

1. **Plan:** What you intend to build in this sprint
2. **Development:** Code implementation
3. **Testing:** Brief explanation of how you tested it
4. **Summary:** What was completed, what was not (if anything), and what's next
5. **Authorization:** Explicitly ask the user to proceed to the next sprint

### Suggested Sprint Structure (You Decide Final)

- **Sprint 1:** Foundation (Backend setup, Database models, Authentication scaffolding)
- **Sprint 2:** Customer MVP (Catalog, Product cards, Search, Cart, Order flow)
- **Sprint 3:** Admin Panel (Dashboard, Product CRUD, Order management)
- **Sprint 4:** Vendor Portal (Login, Order views, Status updates, Payout history)
- **Sprint 5:** Polish & Optimization (Responsive design, Performance, Edge cases)

---

## SUMMARY TABLE OF REQUIREMENTS

| **Category**      | **Details**                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| **Project Name**  | Al Ameen Collective                                                         |
| **Business Type** | Dropshipping / Reselling (Cloth/Fabric)                                     |
| **User Roles**    | Customer, Admin (Reseller), Vendor (Supplier)                               |
| **Tech Stack**    | MERN (MongoDB, Express, React, Node.js) + Prisma                            |
| **Auth**          | JWT/session-based for Admin & Vendor; Customers don't log in                |
| **Cart**          | LocalStorage (no account required)                                          |
| **Search**        | Fuzzy search (Fuse.js or similar)                                           |
| **Pricing**       | Wholesale + Admin Commission (Fixed Flat, with per-product override)        |
| **Delivery**      | One-time flat fee per order; configurable threshold for free delivery       |
| **Commission**    | Manually marked as "Received" by Admin after Vendor pays                    |
| **Transparency**  | Vendor sees full financial breakdown (Wholesale, Selling Price, Commission) |
| **Tracking**      | Public link for customers; Private link for Vendor                          |
| **Development**   | Agile methodology; User-authorizes each sprint                              |

---

## FINAL INSTRUCTIONS

1. **Read this entire prompt carefully.**
2. **Plan your sprints.** Break down the work into logical, incremental phases.
3. **Present your sprint plan to the user.**
4. **Wait for explicit authorization** before writing a single line of code.
5. **Build, test, and deliver** working functionality each sprint.
6. **Report progress** and ask for next sprint authorization.
7. **Ask clarifying questions** if anything is unclear.

---

**This is your complete project specification. You are now ready to begin planning. Await the user's command to proceed.**
