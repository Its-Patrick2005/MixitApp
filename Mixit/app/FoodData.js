const foodList = [
  {
    id: "breakfast1",
    name: "Pancakes",
    image:
      "https://www.allrecipes.com/thmb/FE0PiuuR0Uh06uVh1c2AsKjRGbc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_002-0e249c95678f446291ebc9408ae64c05.jpg",
    rating: 4.5,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Flour`,
      `${servings * 1} cup Milk`,
      `${servings * 1} Egg`,
      `${servings * 2} tbsp Sugar`,
      `${servings * 1} tsp Baking Powder`,
      `${servings * 2} tbsp Butter`,
    ],
    method: (servings = 1) => [
      `Mix dry ingredients in a bowl.`,
      `Whisk in ${servings * 1} cup milk, ${servings * 1} egg(s), and melted butter until smooth.`,
      `Preheat a griddle or pan over medium heat.`,
      `Pour batter and cook until bubbles form.`,
      `Flip and cook until golden brown.`,
      `Serve with syrup or toppings.`,
    ],
    funFact:
      "🥞 The world's largest pancake was made in 1994 and weighed over 6,600 pounds!...",
  },
  {
    id: "breakfast2",
    name: "Omelette",
    image:
      "https://www.blueband.com/en-pk/-/media/Project/Upfield/Brands/Blue-Band/Blue-Band-PK/Assets/Recipes/Web-banner-3.jpg",
    rating: 4.2,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 2} Eggs`,
      `${servings * 0.25} tsp Salt`,
      `${servings * 0.25} tsp Pepper`,
      `${servings * 0.5} cup Vegetables`,
      `${servings * 0.25} cup Cheese`,
    ],
    method: (servings = 1) => [
      `Crack ${servings * 2} eggs into a bowl and beat with salt and pepper.`,
      `Heat oil in a non-stick skillet.`,
      `Pour eggs into the pan and spread evenly.`,
      `Add vegetables and cheese on one half.`,
      `Fold the omelette over and cook until set.`,
      `Slide onto a plate and serve warm.`,
    ],
    funFact:
      "🍳 Napoleon's army inspired the creation of the first giant omelette festival in France!...",
  },
  {
    id: "breakfast3",
    name: "French Toast",
    image:
      "https://www.chilitochoc.com/wp-content/uploads/2025/04/buttermilk-french-toast-recipe.jpg",
    rating: 4.3,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 2} slices Bread`,
      `${servings * 1} Egg`,
      `${servings * 0.5} cup Milk`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 0.25} tsp Cinnamon`,
      `${servings * 1} tbsp Butter`,
    ],
    method: (servings = 1) => [
      `Whisk eggs, milk, sugar, and cinnamon in a bowl.`,
      `Dip ${servings * 2} bread slices in the mixture.`,
      `Heat butter in a pan over medium heat.`,
      `Cook bread until golden brown on both sides.`,
      `Serve with maple syrup or fresh fruit.`,
    ],
    funFact: "🍞 French toast dates back to ancient Rome!...",
  },
  {
    id: "lunch1",
    name: "Grilled Chicken Salad",
    image:
      "https://somuchfoodblog.com/wp-content/uploads/2022/07/chicken-green-salad4.jpg",
    rating: 4.7,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} Grilled Chicken Breast`,
      `${servings * 1} cup Lettuce`,
      `${servings * 0.5} cup Tomatoes`,
      `${servings * 0.5} cup Cucumbers`,
      `${servings * 1} tbsp Olive Oil`,
      `${servings * 1} tbsp Lemon Juice`,
    ],
    method: (servings = 1) => [
      `Grill ${servings * 1} chicken breast until cooked through.`,
      `Chop lettuce, tomatoes, and cucumbers.`,
      `Slice grilled chicken into strips.`,
      `Toss vegetables and chicken in a bowl.`,
      `Drizzle olive oil and lemon juice on top.`,
      `Mix well and serve fresh.`,
    ],
    funFact: "🥗 The word 'salad' comes from the Latin 'sal' meaning salt!...",
  },
  {
    id: "lunch2",
    name: "Caesar Salad",
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
    rating: 4.4,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Romaine Lettuce`,
      `${servings * 2} tbsp Parmesan Cheese`,
      `${servings * 0.5} cup Croutons`,
      `${servings * 1} Anchovy`,
      `${servings * 1} tbsp Lemon Juice`,
      `${servings * 1} tbsp Olive Oil`,
    ],
    method: (servings = 1) => [
      `Wash and chop romaine lettuce.`,
      `Make Caesar dressing with anchovies, lemon, and olive oil.`,
      `Toss lettuce with dressing.`,
      `Add croutons and parmesan cheese.`,
      `Serve immediately.`,
    ],
    funFact: "🥗 The Caesar salad was invented in 1924 by Caesar Cardini...",
  },
  {
    id: "lunch3",
    name: "Quinoa Bowl",
    image: "https://images.themodernproper.com/production/posts/2020/QuinoaBowl_4.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1737605526&s=b91b6baac05eb76bd048a76d12f4a9cd",
    rating: 4.6,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Quinoa`,
      `${servings * 1} cup Kale`,
      `${servings * 0.5} cup Cherry Tomatoes`,
      `${servings * 0.5} Avocado`,
      `${servings * 1} tbsp Olive Oil`,
      `${servings * 1} tbsp Lemon Juice`,
    ],
    method: (servings = 1) => [
      `Cook quinoa according to package instructions.`,
      `Massage kale with olive oil and lemon juice.`,
      `Chop vegetables and avocado.`,
      `Mix quinoa with vegetables.`,
      `Season with salt and pepper.`,
      `Serve in a bowl.`,
    ],
    funFact: "🌾 Quinoa was called 'the gold of the Incas'...",
  },
  {
    id: "dinner1",
    name: "Grilled Salmon",
    image:
      "https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg",
    rating: 4.8,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} Salmon Fillet`,
      `${servings * 2} tbsp Olive Oil`,
      `${servings * 1} Lemon`,
      `${servings * 1} tbsp Dill`,
      `${servings * 0.5} tsp Salt`,
      `${servings * 0.25} tsp Pepper`,
    ],
    method: (servings = 1) => [
      `Preheat grill to medium-high heat.`,
      `Season ${servings * 1} salmon fillet with salt, pepper, and dill.`,
      `Brush with olive oil and lemon juice.`,
      `Grill for 4-5 minutes per side.`,
      `Serve with lemon wedges.`,
    ],
    funFact:
      "🐟 Salmon can jump up to 12 feet high! They're incredible athletes that can swim against strong currents and even climb waterfalls. Wild salmon can travel thousands of miles from the ocean back to the exact stream where they were born to spawn. The pink color of salmon comes from their diet of krill and shrimp! 🏊‍♂️",
  },
  {
    id: "dinner2",
    name: "Beef Stir Fry",
    image:
      "https://www.jocooks.com/wp-content/uploads/2020/11/korean-beef-stir-fry-1-14.jpg",
    rating: 4.5,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} lb Beef Strips`,
      `${servings * 1} cup Broccoli`,
      `${servings * 0.5} Onion`,
      `${servings * 2} cloves Garlic`,
      `${servings * 2} tbsp Soy Sauce`,
      `${servings * 1} tsp Ginger`,
    ],
    method: (servings = 1) => [
      `Slice ${servings * 0.5} lb beef into thin strips.`,
      `Chop vegetables.`,
      `Heat oil in a wok over high heat.`,
      `Stir-fry beef until browned.`,
      `Add vegetables and stir-fry.`,
      `Add soy sauce and seasonings.`,
      `Serve over rice.`,
    ],
    funFact:
      "🥢 Stir-frying was invented in China over 2,000 years ago! The technique was developed to cook food quickly and efficiently, saving fuel. The word 'wok' comes from the Cantonese word for 'cooking pot.' Traditional woks are made of carbon steel and develop a natural non-stick coating called 'patina' over time! 🏮",
  },
  {
    id: "dinner3",
    name: "Roasted Chicken",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUePdR_8ZF4FVJvFIjxFlkCv9NEhzT-WEi1A&s",
    rating: 4.7,
    servings: 4,
    ingredients: (servings = 4) => [
      `${servings / 4} Whole Chicken`,
      `${servings * 0.5} tsp Salt`,
      `${servings * 0.25} tsp Pepper`,
      `${servings * 1} tbsp Herbs`,
      `${servings * 2} tbsp Butter`,
      `${servings * 2} cloves Garlic`,
    ],
    method: (servings = 4) => [
      `Preheat oven to 425°F (220°C).`,
      `Season ${servings / 4} chicken with salt, pepper, and herbs.`,
      `Stuff cavity with garlic and herbs.`,
      `Rub with butter.`,
      `Roast for ${servings > 4 ? Math.ceil(servings / 4) * 75 : 75} minutes until golden.`,
      `Let rest for 10 minutes before carving.`,
    ],
    funFact:
      "🍗 The average American eats about 93 pounds of chicken per year! That's more than any other meat. Chickens are descendants of the red jungle fowl from Southeast Asia. They were first domesticated over 8,000 years ago. A chicken can run at speeds up to 9 mph - faster than most humans can walk! 🐔",
  },
  {
    id: "supper1",
    name: "Spaghetti Bolognese",
    image:
      "https://www.slimmingeats.com/blog/wp-content/uploads/2010/04/spaghetti-bolognese-36-720x720.jpg",
    rating: 4.3,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.25} lb Spaghetti`,
      `${servings * 0.25} lb Ground Beef`,
      `${servings * 0.5} cup Tomato Sauce`,
      `${servings * 0.25} Onion`,
      `${servings * 1} clove Garlic`,
      `${servings * 1} tsp Herbs`,
    ],
    method: (servings = 1) => [
      `Boil ${servings * 0.25} lb spaghetti according to package instructions.`,
      `Sauté onions and garlic until soft.`,
      `Add ground beef and cook until browned.`,
      `Pour in tomato sauce and herbs.`,
      `Simmer sauce for 15–20 minutes.`,
      `Serve sauce over drained spaghetti.`,
    ],
    funFact:
      "🍝 Traditional Bolognese sauce uses very little tomato and lots of milk! The original recipe from Bologna, Italy, dates back to the 15th century. Italians take their pasta so seriously that there's actually a law in Italy that regulates what can be called 'Bolognese'! The sauce should simmer for at least 2 hours - patience is literally the secret ingredient! ⏰",
  },
  {
    id: "supper2",
    name: "Pizza Margherita",
    image:
      "https://www.stefanofaita.com/wp-content/uploads/2022/04/pizzamargherita1.jpg",
    rating: 4.6,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} Pizza Dough`,
      `${servings * 0.25} cup Tomato Sauce`,
      `${servings * 0.5} cup Mozzarella`,
      `${servings * 2} tbsp Basil`,
      `${servings * 1} tbsp Olive Oil`,
      `${servings * 0.25} tsp Salt`,
    ],
    method: (servings = 1) => [
      `Preheat oven to 500°F (260°C).`,
      `Roll out ${servings * 1} pizza dough.`,
      `Spread tomato sauce on dough.`,
      `Add mozzarella cheese.`,
      `Bake for 10-12 minutes.`,
      `Add fresh basil and drizzle with olive oil.`,
    ],
    funFact:
      "🍕 Pizza Margherita was created in 1889 by pizzaiolo Raffaele Esposito! He made it in honor of Queen Margherita of Italy, using the colors of the Italian flag: red (tomatoes), white (mozzarella), and green (basil). The first pizzeria in America opened in 1905 in New York City. Today, Americans eat about 3 billion pizzas per year! 👑",
  },
  {
    id: "supper3",
    name: "Lasagna",
    image:
      "https://images.arla.com/recordid/400FD751-4B22-4CC2-BE79C5E5B417A2F5/easy-beef-lasagna-with-bechamel-sauce.jpg?width=1200&height=630&format=webp",
    rating: 4.4,
    servings: 6,
    ingredients: (servings = 6) => [
      `${servings * 2} Lasagna Noodles`,
      `${servings * 0.25} lb Ground Beef`,
      `${servings * 0.25} cup Ricotta Cheese`,
      `${servings * 0.25} cup Mozzarella`,
      `${servings * 0.25} cup Tomato Sauce`,
      `${servings * 1} clove Garlic`,
    ],
    method: (servings = 6) => [
      `Cook ${servings * 2} lasagna noodles.`,
      `Brown ground beef with garlic.`,
      `Layer noodles, meat sauce, and cheese.`,
      `Repeat layers.`,
      `Bake at 375°F (190°C) for 45 minutes.`,
      `Let rest for 10 minutes before serving.`,
    ],
    funFact:
      "🍝 Lasagna is one of the oldest pasta dishes! The word 'lasagna' comes from the Greek word 'laganon,' which was a flat sheet of pasta dough cut into strips. The first recorded recipe for lasagna dates back to the 14th century in Italy. The world's largest lasagna weighed over 13,000 pounds and was made in California! 🏆",
  },
  {
    id: "dessert1",
    name: "Chocolate Cake",
    image:
      "https://butternutbakeryblog.com/wp-content/uploads/2023/04/chocolate-cake.jpg",
    rating: 4.9,
    servings: 8,
    ingredients: (servings = 8) => [
      `${servings * 0.25} cup Flour`,
      `${servings * 0.125} cup Cocoa Powder`,
      `${servings * 0.25} Eggs`,
      `${servings * 0.25} cup Sugar`,
      `${servings * 1} tbsp Butter`,
      `${servings * 0.125} tsp Baking Powder`,
    ],
    method: (servings = 8) => [
      `Preheat oven to 350°F (175°C).`,
      `Mix dry ingredients in one bowl.`,
      `Mix wet ingredients in another bowl.`,
      `Combine wet and dry ingredients.`,
      `Pour into a greased cake pan.`,
      `Bake for ${Math.ceil(servings / 8) * 35} minutes.`,
      `Cool and frost as desired.`,
    ],
    funFact:
      "🍰 Chocolate cake became popular in the U.S. in the late 1800s, but the first chocolate cake was actually invented by Dr. James Baker in 1765! The world's most expensive cake costs $75 million and is decorated with real diamonds! 🥵 The Aztecs used chocolate as currency - imagine paying for your groceries with chocolate bars! 💎",
  },
  {
    id: "breakfast16",
    name: "Koko with Koose",
    image:
      "https://www.sophiaapenkro.com/wp-content/uploads/2023/07/hausa-koko.jpg",
    rating: 4.6,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Millet`,
      `${servings * 2} cups Water`,
      `${servings * 0.25} tsp Salt`,
      `${servings * 2} Koose (Bean Cake)`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 0.25} cup Milk (optional)`,
    ],
    method: (servings = 1) => [
      `Soak ${servings * 0.5} cup millet overnight and grind into a smooth paste.`,
      `Ferment the paste for a day.`,
      `Boil with water, stirring constantly until thick.`,
      `Serve hot with koose and sugar or milk.`,
    ],
    funFact:
      "🌾 Koko is a popular Ghanaian breakfast porridge, often enjoyed with spicy bean cakes called koose!",
  },
  {
    id: "breakfast17",
    name: "Hausa Koko",
    image:
      "https://i.pinimg.com/736x/91/92/04/919204f87a5cc4fda48a52a62c6e678e.jpg",
    rating: 4.4,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Millet`,
      `${servings * 1} tsp Spices`,
      `${servings * 2} cups Water`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 0.25} cup Milk (optional)`,
    ],
    method: (servings = 1) => [
      `Mix ${servings * 0.5} cup millet flour with water and spices.`,
      `Cook over medium heat, stirring until thick.`,
      `Serve hot with sugar and milk.`,
    ],
    funFact:
      "🌶 Hausa Koko is known for its spicy flavor, thanks to ginger and pepper!",
  },
  {
    id: "lunch28",
    name: "Waakye",
    image:
      "https://4.bp.blogspot.com/-hjzkxQ83RdI/WvWrDiRZzHI/AAAAAAAAALc/N9bdD4kUpbAMDudeOwNzGENWNS0LOIaAQCLcBGAs/s1600/waakye.jpg",
    rating: 4.8,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Rice`,
      `${servings * 0.25} cup Beans`,
      `${servings * 2} Millet Leaves`,
      `${servings * 0.25} tsp Salt`,
      `${servings * 0.25} lb Meat`,
      `${servings * 1} Eggs`,
      `${servings * 0.5} Fried Plantain`,
    ],
    method: (servings = 1) => [
      `Boil ${servings * 0.5} cup rice and ${servings * 0.25} cup beans together with millet leaves.`,
      `Serve with stew, meat, egg, and fried plantain.`,
    ],
    funFact:
      "🍚 Waakye is a beloved street food in Ghana, often served with a variety of sides!",
  },
  {
    id: "lunch29",
    name: "Jollof Rice",
    image:
      "https://img.freepik.com/premium-photo/jollof-rice-with-splash-lime-juice-yummy-delicious-jollof-rice-food-photography_1295756-90902.jpg?w=2000",
    rating: 4.9,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Rice`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} Onion`,
      `${servings * 1} clove Garlic`,
      `${servings * 1} Pepper`,
      `${servings * 0.25} lb Chicken`,
    ],
    method: (servings = 1) => [
      `Blend ${servings * 2} tomatoes, onions, and pepper.`,
      `Fry the mixture, add rice and stock.`,
      `Cook until rice is done and serve with chicken.`,
    ],
    funFact:
      "🍅 Jollof rice is a West African classic—Ghana and Nigeria both claim to make the best!",
  },
  {
    id: "lunch30",
    name: "Banku and Tilapia",
    image:
      "https://afrifoodnetwork.com/wp-content/uploads/2023/07/Oven-baked-tilapia-recipe-scaled.jpeg",
    rating: 4.7,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Corn Dough`,
      `${servings * 0.5} cup Cassava Dough`,
      `${servings * 1} Tilapia`,
      `${servings * 1} Pepper`,
      `${servings * 0.25} Onion`,
    ],
    method: (servings = 1) => [
      `Mix corn and cassava dough, cook into a smooth paste.`,
      `Grill ${servings * 1} tilapia and serve with spicy pepper sauce.`,
    ],
    funFact:
      "🐟 Banku and grilled tilapia is a favorite dish along Ghana's coast!",
  },
  {
    id: "supper24",
    name: "Fufu and Light Soup",
    image:
      "https://i.pinimg.com/736x/d1/91/88/d19188f6dcc876c7181db2797e951b70.jpg",
    rating: 4.8,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} Plantain`,
      `${servings * 0.5} cup Cassava`,
      `${servings * 0.25} lb Chicken`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} Onion`,
      `${servings * 1} Pepper`,
    ],
    method: (servings = 1) => [
      `Boil ${servings * 1} plantain and cassava, then pound until smooth.`,
      `Prepare light soup with chicken, tomatoes, and spices.`,
      `Serve fufu in soup.`,
    ],
    funFact:
      "🥣 Fufu is pounded by hand and is a staple in many Ghanaian homes!",
  },
  {
    id: "supper25",
    name: "Kokonte and Groundnut Soup",
    image:
      "https://tse1.explicit.bing.net/th/id/OIP.2bRbOToWO_u5d6hxyDixowHaEx?r=0&rs=1&pid=ImgDetMain",
    rating: 4.3,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Dried Cassava Flour`,
      `${servings * 0.25} cup Groundnut Paste`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} lb Meat`,
      `${servings * 0.25} Onion`,
    ],
    method: (servings = 1) => [
      `Mix ${servings * 0.5} cup cassava flour with water and cook into a dough.`,
      `Prepare groundnut soup with meat and spices.`,
      `Serve kokonte with soup.`,
    ],
    funFact:
      "🌰 Kokonte is sometimes called 'face the wall' and is enjoyed with rich peanut soup!",
  },
  {
    id: "dessert16",
    name: "Bofrot (Puff-Puff)",
    image:
      "https://yummieliciouz.com/wp-content/uploads/2023/05/authentic-Ghana-dry-bofrot-768x512.png",
    rating: 4.5,
    servings: 6,
    ingredients: (servings = 6) => [
      `${servings * 0.25} cup Flour`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 0.25} Eggs`,
      `${servings * 0.125} tsp Yeast`,
      `${servings * 0.25} cup Water`,
      `Oil for frying`,
    ],
    method: (servings = 6) => [
      `Mix flour, sugar, eggs, yeast, and water.`,
      `Let the dough rise, then fry in hot oil until golden.`,
    ],
    funFact:
      "🍩 Bofrot is a sweet, fluffy doughnut ball sold on Ghanaian streets!",
  },
  {
    id: "dessert2",
    name: "Kelewele",
    image:
      "https://travelfoodatlas.com/wp-content/uploads/2019/08/Ghanaian-Kelewele-fried-plantains-recipe.jpeg",
    rating: 4.7,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} Ripe Plantain`,
      `${servings * 0.5} tsp Pepper`,
      `${servings * 0.25} tsp Salt`,
      `${servings * 0.5} tsp Ginger`,
      `Oil for frying`,
    ],
    method: (servings = 1) => [
      `Dice ${servings * 1} plantain and season with spices.`,
      `Fry until golden and crispy.`,
    ],
    funFact:
      "🍌 Kelewele is a spicy fried plantain snack, perfect for evenings!",
  },
  {
    id: "snack1",
    name: "Chinchinga (Kebabs)",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3154da128204315.6151d1bf1eca2.jpg",
    rating: 4.6,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.25} lb Beef`,
      `${servings * 0.5} tsp Pepper`,
      `${servings * 0.25} Onion`,
      `${servings * 0.25} tsp Salt`,
      `${servings * 1} tbsp Oil`,
      `${servings * 0.5} tsp Spices`,
    ],
    method: (servings = 1) => [
      `Season ${servings * 0.25} lb beef cubes and skewer with onions.`,
      `Grill over charcoal until cooked.`,
    ],
    funFact: "🍢 Chinchinga is Ghana's version of spicy street kebabs!",
  },
  {
    id: "snack2",
    name: "Agbeli Kaklo",
    image:
      "https://gingerandseasalt.com/wp-content/uploads/2020/09/agbeli-kaklo-500x500.jpg",
    rating: 4.2,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Cassava`,
      `${servings * 0.25} tsp Salt`,
      `Oil for frying`,
    ],
    method: (servings = 1) => [
      `Grate ${servings * 1} cup cassava and squeeze out water.`,
      `Season and shape into balls.`,
      `Fry until golden brown.`,
    ],
    funFact:
      "🍠 Agbeli Kaklo is a crunchy cassava snack from the Volta Region!",
  },
  {
    id: "drink1",
    name: "Sobolo",
    image:
      "https://t4.ftcdn.net/jpg/02/51/17/79/360_F_251177928_mnBFtGg3uWYRJcSATpqC45E97q4GapCD.jpg",
    rating: 4.8,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 2} tbsp Hibiscus Leaves`,
      `${servings * 1} tsp Ginger`,
      `${servings * 0.25} cup Pineapple`,
      `${servings * 1} tbsp Lemon`,
      `${servings * 1} tbsp Sugar`,
    ],
    method: (servings = 1) => [
      `Boil hibiscus leaves with ginger and pineapple.`,
      `Strain and sweeten with sugar and lemon.`,
    ],
    funFact:
      "🌺 Sobolo is a refreshing Ghanaian drink, also known as hibiscus tea!",
  },
  {
    id: "breakfast18",
    name: "Tom Brown",
    image: "https://kentetv.com/wp-content/uploads/2023/07/tom-brown.jpg",
    rating: 4.3,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.25} cup Roasted Maize`,
      `${servings * 2} tbsp Groundnuts`,
      `${servings * 1} cup Water`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 0.25} cup Milk`,
    ],
    method: (servings = 1) => [
      `Mix Tom Brown flour with water.`,
      `Cook over medium heat, stirring constantly.`,
      `Serve hot with sugar and milk.`,
    ],
    funFact: "🥣 Tom Brown is a nutritious porridge for kids and adults alike!",
  },
  {
    id: "lunch4",
    name: "Gari Foto",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.mkbzfa2XTKjj8hu7psiuMAHaEt?r=0&rs=1&pid=ImgDetMain",
    rating: 4.1,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Gari`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} Onion`,
      `${servings * 1} clove Garlic`,
      `${servings * 1} Eggs`,
      `${servings * 2} tbsp Oil`,
    ],
    method: (servings = 1) => [
      `Prepare tomato stew with onions and garlic.`,
      `Add ${servings * 0.5} cup gari and stir until well mixed.`,
      `Serve with boiled eggs.`,
    ],
    funFact: "🥣 Gari Foto is a quick, filling meal made from cassava flakes!",
  },
  {
    id: "supper10",
    name: "Yam Porridge",
    image: "https://i.ytimg.com/vi/Abb0Jme4ol8/maxresdefault.jpg",
    rating: 4.0,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Yam`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} Onion`,
      `${servings * 1} clove Garlic`,
      `${servings * 2} tbsp Oil`,
      `${servings * 0.5} tsp Spices`,
    ],
    method: (servings = 1) => [
      `Peel and dice ${servings * 1} cup yam, boil until soft.`,
      `Prepare tomato sauce and add yam.`,
      `Simmer until thick and serve hot.`,
    ],
    funFact: "🍠 Yam porridge is a hearty meal enjoyed across Ghana!",
  },
  {
    id: "breakfast4",
    name: "Rice Water",
    image:
      "https://lh3.googleusercontent.com/-TgGvGUZ2Q8o/WQ2AYhA1ICI/AAAAAAAAHuM/s-HFqZtzEOoh5TT-lzuYIKKu75ntFl1-ACHM/w1200-h630-p-k-no-nu/%255BUNSET%255D",
    rating: 4.2,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.25} cup Rice`,
      `${servings * 2} cups Water`,
      `${servings * 0.25} cup Milk`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 0.125} tsp Salt`,
    ],
    method: (servings = 1) => [
      `Wash ${servings * 0.25} cup rice and boil in water until soft.`,
      `Add milk and sugar to taste.`,
      `Serve hot for breakfast.`,
    ],
    funFact:
      "🍚 Rice water is a simple, comforting porridge enjoyed by many Ghanaian children!",
  },
  {
    id: "breakfast5",
    name: "Angwamo (Oiled Rice)",
    image:
      "https://i.pinimg.com/736x/3d/b2/ab/3db2ab885a9290b83ab96df5df9c4f1b.jpg",
    rating: 4.3,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Rice`,
      `${servings * 2} tbsp Oil`,
      `${servings * 0.25} Onion`,
      `${servings * 0.25} tsp Salt`,
      `${servings * 1} Eggs (optional)`,
      `${servings * 1} Sardine (optional)`,
    ],
    method: (servings = 1) => [
      `Heat oil and fry onions until fragrant.`,
      `Add ${servings * 0.5} cup rice and stir, then add water and salt.`,
      `Cook until rice is done. Serve with fried eggs or sardines.`,
    ],
    funFact:
      "🍳 Angwamo is a quick, tasty rice dish often paired with fried eggs or sardines!",
  },
  {
    id: "lunch5",
    name: "Eba and Okro Soup",
    image:
      "https://img-global.cpcdn.com/recipes/3c66799752a605bd/680x482cq70/eba-okro-soup-stew-recipe-main-photo.jpg",
    rating: 4.5,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Gari`,
      `${servings * 1} cup Water`,
      `${servings * 1} cup Okro Soup`,
      `${servings * 0.25} lb Meat`,
      `${servings * 0.25} lb Fish`,
    ],
    method: (servings = 1) => [
      `Stir ${servings * 0.5} cup gari into hot water to form a dough.`,
      `Prepare okro soup with meat and fish.`,
      `Serve eba with okro soup.`,
    ],
    funFact:
      "🌱 Eba is more common in Nigeria but loved in Ghana, especially with slimy okro soup!",
  },
  {
    id: "lunch6",
    name: "Fried Rice",
    image:
      "https://png.pngtree.com/png-vector/20240124/ourlarge/pngtree-fried-rice-and-fried-chicken-png-image_11477085.png",
    rating: 4.6,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Rice`,
      `${servings * 0.25} cup Carrots`,
      `${servings * 0.25} Onion`,
      `${servings * 0.25} cup Peas`,
      `${servings * 0.25} lb Chicken`,
      `${servings * 2} tbsp Oil`,
      `${servings * 0.5} tsp Spices`,
    ],
    method: (servings = 1) => [
      `Cook ${servings * 0.5} cup rice and set aside.`,
      `Stir-fry vegetables and chicken in oil.`,
      `Add rice and spices, stir well and serve.`,
    ],
    funFact:
      "🍗 Ghanaian fried rice is a party favorite, often served with grilled chicken and shito!",
  },
  {
    id: "supper4",
    name: "Ampesi with Kontomire Stew",
    image: "https://i.ytimg.com/vi/wSXdHWdr72E/maxresdefault.jpg",
    rating: 4.4,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Yam`,
      `${servings * 1} Plantain`,
      `${servings * 0.5} cup Cocoyam`,
      `${servings * 1} cup Kontomire (Cocoyam Leaves)`,
      `${servings * 0.25} cup Groundnut Paste`,
      `${servings * 0.25} Onion`,
      `${servings * 2} tbsp Oil`,
    ],
    method: (servings = 1) => [
      `Boil yam, plantain, and cocoyam until soft.`,
      `Prepare kontomire stew with groundnut paste and spices.`,
      `Serve ampesi with stew.`,
    ],
    funFact:
      "🥬 Kontomire stew is rich in iron and a staple in many Ghanaian homes!",
  },
  {
    id: "supper5",
    name: "Red Red",
    image: "https://i.ytimg.com/vi/ZdP-Ei6-tGc/maxresdefault.jpg",
    rating: 4.7,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Black-eyed Beans`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} Onion`,
      `${servings * 2} tbsp Palm Oil`,
      `${servings * 1} Fried Plantain`,
    ],
    method: (servings = 1) => [
      `Boil ${servings * 0.5} cup beans until soft.`,
      `Prepare tomato stew with palm oil and onions.`,
      `Mix beans with stew and serve with fried plantain.`,
    ],
    funFact:
      "🍛 Red Red gets its name from the red palm oil and fried plantain!",
  },
  {
    id: "dessert3",
    name: "Atadwe Milk Drink",
    image:
      "https://i.pinimg.com/originals/f9/77/60/f97760a37b608375b12aaed1c173e719.png",
    rating: 4.3,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.25} cup Tiger Nuts`,
      `${servings * 0.5} cup Milk`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 1} cup Water`,
      `${servings * 0.25} tsp Spices`,
    ],
    method: (servings = 1) => [
      `Soak ${servings * 0.25} cup tiger nuts and blend with water.`,
      `Strain and add milk, sugar, and spices.`,
      `Serve chilled.`,
    ],
    funFact:
      "🌰 Atadwe milk is a healthy, refreshing drink made from tiger nuts!",
  },
  {
    id: "snack3",
    name: "Kuli Kuli",
    image:
      "https://cdn.tasteatlas.com/images/dishes/4b7b672cbaa24a69ac84a2c650fca94a.jpg?m=facebook",
    rating: 4.1,
    servings: 4,
    ingredients: (servings = 4) => [
      `${servings * 0.5} cup Groundnuts`,
      `Oil for frying`,
      `${servings * 0.25} tsp Salt`,
    ],
    method: (servings = 4) => [
      `Roast and grind ${servings * 0.5} cup groundnuts into a paste.`,
      `Squeeze out oil and shape into sticks.`,
      `Fry until crispy.`,
    ],
    funFact:
      "🥜 Kuli Kuli is a crunchy peanut snack, perfect with garri soakings!",
  },
  {
    id: "snack4",
    name: "Ayigbe Biscuit",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifoWDfavEE5PysIdto1NKeMQYeBUiNq9gxaXAdoRiqkdjqG-7eWboNXLDo9npVoj-h80AKg1fgA37k-fkZXzns-XWVyV6ZHcdd9u2iKvTMg8L5Ci3EgsF_nHHuaUaBPBujxQ_BOEacLskEuPk99LeGojcS_PpU9If2nZI2ExjOBA9sN_9YZMiZQu87TWhw/s944/IMG-20230809-WA0014.jpg",
    rating: 4.0,
    servings: 8,
    ingredients: (servings = 8) => [
      `${servings * 0.25} cup Cassava Starch`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 0.125} tsp Salt`,
      `${servings * 2} tbsp Coconut (optional)`,
    ],
    method: (servings = 8) => [
      `Mix cassava starch with sugar and salt.`,
      `Shape into small rounds and bake until crisp.`,
    ],
    funFact:
      "🍪 Ayigbe biscuit is a light, crunchy treat from the Volta Region!",
  },
  {
    id: "drink2",
    name: "Pito",
    image:
      "https://images.squarespace-cdn.com/content/v1/63d597ad4f536a40da6e2e8e/62871602-14b5-4617-8329-26fc3df60c21/pito.jpeg",
    rating: 4.2,
    servings: 2,
    ingredients: (servings = 2) => [
      `${servings * 0.5} cup Millet`,
      `${servings * 3} cups Water`,
      `${servings * 0.125} tsp Yeast`,
    ],
    method: (servings = 2) => [
      `Ferment ${servings * 0.5} cup millet and mash.`,
      `Boil and strain to get the drink.`,
      `Serve chilled or at room temperature.`,
    ],
    funFact:
      "🍺 Pito is a traditional Ghanaian alcoholic beverage brewed from millet!",
  },
  {
    id: "drink3",
    name: "Lamugin (Ginger Drink)",
    image:
      "https://images.squarespace-cdn.com/content/v1/63d597ad4f536a40da6e2e8e/62079bfa-7a77-4da0-aad0-9b1976f63253/Lamugin.jpg",
    rating: 4.5,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 2} tbsp Ginger`,
      `${servings * 1} tbsp Lemon`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 2} cups Water`,
      `${servings * 2} tbsp Rice (optional)`,
    ],
    method: (servings = 1) => [
      `Blend ginger and rice with water.`,
      `Strain and add lemon juice and sugar.`,
      `Serve cold.`,
    ],
    funFact:
      "🧄 Lamugin is a spicy, refreshing drink popular at Ghanaian gatherings!",
  },
  {
    id: "breakfast6",
    name: "Gari Soakings",
    image:
      "https://ocdn.eu/pulscms-transforms/1/1h2ktkqTURBXy9jNDY5NmFlODNhMzkyZDViZTQ5Y2RkYTUxZTUwNjYyOC5qcGVnkpUDADXNAlrNAVOTBc0EsM0Cdg",
    rating: 4.0,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Gari`,
      `${servings * 1} cup Water`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 2} tbsp Groundnuts`,
      `${servings * 0.25} cup Milk`,
    ],
    method: (servings = 1) => [
      `Pour water over ${servings * 0.5} cup gari in a bowl.`,
      `Add sugar, milk, and groundnuts.`,
      `Stir and enjoy chilled.`,
    ],
    funFact:
      "🥣 Gari soakings is a quick, energizing snack or breakfast for students!",
  },
  {
    id: "lunch7",
    name: "Tuo Zaafi",
    image:
      "https://i0.wp.com/www.gbcghanaonline.com/wp-content/uploads/2022/03/Tuo-Zaafi.jpg",
    rating: 4.6,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Maize Flour`,
      `${servings * 2} cups Water`,
      `${servings * 1} cup Ayoyo Leaves`,
      `${servings * 0.25} lb Meat`,
      `${servings * 0.25} Onion`,
      `${servings * 1} Pepper`,
    ],
    method: (servings = 1) => [
      `Cook ${servings * 0.5} cup maize flour in water to form a smooth dough.`,
      `Prepare ayoyo soup with meat and spices.`,
      `Serve tuo zaafi with soup.`,
    ],
    funFact:
      "🌿 Tuo Zaafi is a northern Ghanaian staple, often eaten with green ayoyo soup!",
  },
  {
    id: "supper6",
    name: "Omo Tuo (Rice Balls) with Groundnut Soup",
    image:
      "https://ocdn.eu/images/pulscms/M2M7MDA_/c3a00b93d650636f3a95bc6d93159c30.jpg",
    rating: 4.7,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Rice`,
      `${servings * 2} cups Water`,
      `${servings * 0.25} cup Groundnut Paste`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} lb Meat`,
      `${servings * 0.25} Onion`,
    ],
    method: (servings = 1) => [
      `Cook ${servings * 0.5} cup rice until soft and mash into balls.`,
      `Prepare groundnut soup with meat and spices.`,
      `Serve rice balls with soup.`,
    ],
    funFact:
      "🍚 Omo Tuo is a soft rice ball, perfect for soaking up rich Ghanaian soups!",
  },
  {
    id: "dessert4",
    name: "Poloo (Ghanaian Coconut Cookies)",
    image:
      "https://i.pinimg.com/736x/24/a6/90/24a69042e001e99068a48e29feef47a7.jpg",
    rating: 4.2,
    servings: 8,
    ingredients: (servings = 8) => [
      `${servings * 0.25} cup Flour`,
      `${servings * 0.25} cup Coconut`,
      `${servings * 2} tbsp Sugar`,
      `${servings * 2} tbsp Oil`,
      `${servings * 0.125} tsp Salt`,
    ],
    method: (servings = 8) => [
      `Mix flour, coconut, sugar, and salt.`,
      `Shape into small balls and fry until golden.`,
    ],
    funFact:
      "🥥 Poloo is a crunchy coconut snack enjoyed by kids and adults alike!",
  },
  {
    id: "snack5",
    name: "Nkatie Cake (Peanut Brittle)",
    image:
      "https://theafrikanstore.com/cdn/shop/articles/nkatiecake_PCthefoodihouse_1024x1024.jpg?v=1687781386",
    rating: 4.5,
    servings: 6,
    ingredients: (servings = 6) => [
      `${servings * 0.5} cup Groundnuts`,
      `${servings * 0.25} cup Sugar`,
    ],
    method: (servings = 6) => [
      `Roast ${servings * 0.5} cup groundnuts and set aside.`,
      `Melt sugar to caramel, add groundnuts, and mix.`,
      `Pour onto a tray and cut into pieces.`,
    ],
    funFact: "🍬 Nkatie cake is a sweet, crunchy treat sold by street vendors!",
  },
  {
    id: "lunch8",
    name: "Abom",
    image:
      "https://i.pinimg.com/736x/ef/13/9a/ef139a47a28c2019a533030f607ac95c.jpg",
    rating: 4.1,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Kontomire`,
      `${servings * 0.25} Onion`,
      `${servings * 2} tbsp Palm Oil`,
      `${servings * 1} Eggs`,
      `${servings * 0.25} tsp Salt`,
    ],
    method: (servings = 1) => [
      `Steam ${servings * 1} cup kontomire and mash with onions.`,
      `Fry in palm oil and add eggs.`,
      `Serve with yam or plantain.`,
    ],
    funFact: "🥬 Abom is a simple, healthy stew from Ghana's Akan communities!",
  },
  {
    id: "supper7",
    name: "Aprapransa",
    image:
      "https://i.pinimg.com/originals/03/e2/80/03e280e736054a1631d5e9e46ac17303.jpg",
    rating: 4.3,
    servings: 2,
    ingredients: (servings = 2) => [
      `${servings * 0.25} cup Roasted Corn Flour`,
      `${servings * 2} tbsp Palm Oil`,
      `${servings * 0.25} cup Groundnut Paste`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} lb Meat`,
      `${servings * 0.25} Onion`,
    ],
    method: (servings = 2) => [
      `Prepare palm nut soup with groundnut paste and meat.`,
      `Stir in roasted corn flour to form a thick paste.`,
      `Serve with soup.`,
    ],
    funFact:
      "🌽 Aprapransa is a festive dish, often served at traditional ceremonies!",
  },
  {
    id: "drink4",
    name: "Brukina",
    image:
      "https://ghinfosite.wordpress.com/wp-content/uploads/2022/10/brukina.jpg",
    rating: 4.4,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.25} cup Millet`,
      `${servings * 0.5} cup Milk`,
      `${servings * 1} tbsp Sugar`,
      `${servings * 1} cup Water`,
    ],
    method: (servings = 1) => [
      `Soak and steam ${servings * 0.25} cup millet grains.`,
      `Mix with milk and sugar.`,
      `Serve chilled.`,
    ],
    funFact:
      "🥛 Brukina is a nutritious, filling drink popular in northern Ghana!",
  },
  {
    id: "breakfast7",
    name: "Beans Stew with Gari",
    image: "https://www.graphic.com.gh/images/2022/aug/25/gari.png",
    rating: 4.5,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 0.5} cup Beans`,
      `${servings * 2} Tomatoes`,
      `${servings * 0.25} Onion`,
      `${servings * 2} tbsp Oil`,
      `${servings * 0.25} cup Gari`,
    ],
    method: (servings = 1) => [
      `Boil ${servings * 0.5} cup beans until soft.`,
      `Prepare tomato stew and mix with beans.`,
      `Serve with gari sprinkled on top.`,
    ],
    funFact:
      "🫘 Beans and gari is a protein-rich breakfast or lunch for many Ghanaians!",
  },
  {
    id: "lunch9",
    name: "Yam and Garden Egg Stew",
    image: "https://i.ytimg.com/vi/UG3jForkips/maxresdefault.jpg",
    rating: 4.3,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Yam`,
      `${servings * 4} Garden Eggs`,
      `${servings * 0.25} Onion`,
      `${servings * 2} tbsp Oil`,
      `${servings * 2} Tomatoes`,
    ],
    method: (servings = 1) => [
      `Boil ${servings * 1} cup yam until soft.`,
      `Prepare stew with garden eggs, tomatoes, and onions.`,
      `Serve yam with stew.`,
    ],
    funFact: "🍆 Garden egg stew is a favorite among the Ewe and Akan people!",
  },
  {
    id: "supper8",
    name: "Etor",
    image:
      "https://i.pinimg.com/736x/42/04/93/4204937038759e896c042201c293f9a2.jpg",
    rating: 4.2,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Yam`,
      `${servings * 2} tbsp Palm Oil`,
      `${servings * 1} Eggs`,
      `${servings * 0.25} tsp Salt`,
      `${servings * 0.5} tsp Ginger`,
    ],
    method: (servings = 1) => [
      `Boil ${servings * 1} cup yam and mash with palm oil and salt.`,
      `Serve with boiled eggs.`,
    ],
    funFact:
      "🍠 Etor is a ceremonial food, often prepared for birthdays and special occasions!",
  },
  {
    id: "dessert5",
    name: "Akple with Okro Soup",
    image:
      "https://ocdn.eu/pulscms-transforms/1/sjWktkpTURBXy9iNmIxNTIzYzFhNWM1Nzc4Y2JhMjJiODdjOGY2YzlmNC5qcGeSlQMADc0B4M0BDpMFzQMWzQGu",
    rating: 4.4,
    servings: 1,
    ingredients: (servings = 1) => [
      `${servings * 1} cup Corn Flour`,
      `${servings * 2} cups Water`,
      `${servings * 1} cup Okro Soup`,
      `${servings * 0.25} lb Meat`,
      `${servings * 0.25} lb Fish`,
    ],
    method: (servings = 1) => [
      `Stir ${servings * 1} cup corn flour into boiling water to form a dough.`,
      `Prepare okro soup with ${servings * 0.25} lb meat and ${servings * 0.25} lb fish.`,
      `Serve akple with soup.`,
    ],
    funFact: "🌽 Akple is a staple among the Ewe people of Ghana!",
  },
  // ...add more as needed
  {
    id: "lunch10",
    name: "Egusi Soup",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.9zdAW_Z18EqU4BU-OK2nhwAAAA?r=0&rs=1&pid=ImgDetMain",
    rating: 4.8,
    ingredients: [
      "🌰 Melon Seeds",
      "🍗 Meat",
      "🦐 Dried Fish",
      "🥬 Spinach",
      "🧅 Onion",
      "🛢 Palm Oil",
      "🌶 Pepper",
    ],
    method: [
      "Grind melon seeds and mix with water.",
      "Cook meat and fish in a pot.",
      "Add palm oil, onions, and pepper.",
      "Stir in melon seed paste and simmer.",
      "Add spinach and cook until tender.",
    ],
    funFact:
      "🌰 Egusi soup is a Nigerian classic, loved for its rich, nutty flavor!",
  },
  {
    id: "supper9",
    name: "Bunny Chow",
    image:
      "https://img.freepik.com/premium-photo/bunny-chow-south-africa-transparent-background_1106493-68019.jpg",
    rating: 4.7,
    ingredients: [
      "🍞 Bread Loaf",
      "🍛 Curry (Chicken, Beef, or Veg)",
      "🧅 Onion",
      "🧄 Garlic",
      "🌶 Spices",
    ],
    method: [
      "Prepare a spicy curry with your choice of meat or vegetables.",
      "Hollow out a loaf of bread.",
      "Fill the bread with curry and serve hot.",
    ],
    funFact:
      "🍞 Bunny chow originated in Durban, South Africa, as a portable meal for Indian laborers!",
  },
  {
    id: "lunch11",
    name: "Ugali with Sukuma Wiki",
    image:
      "https://7continents2u.com.au/wp-content/uploads/2021/06/Sukuma-Wiki-Tanzania.png",
    rating: 4.5,
    ingredients: [
      "🌽 Maize Flour",
      "💧 Water",
      "🥬 Sukuma Wiki (Collard Greens)",
      "🧅 Onion",
      "🛢 Oil",
      "🧂 Salt",
    ],
    method: [
      "Boil water and stir in maize flour to form a stiff dough.",
      "Sauté onions and greens in oil.",
      "Serve ugali with sukuma wiki.",
    ],
    funFact:
      "🌽 Ugali is a staple in East Africa, especially in Kenya and Tanzania!",
  },
  {
    id: "breakfast8",
    name: "Mandazi",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.iE8IYne6vmZDF7aTbr-YbwHaEK?r=0&rs=1&pid=ImgDetMain",
    rating: 4.6,
    ingredients: [
      "🌾 Flour",
      "🥥 Coconut Milk",
      "🍬 Sugar",
      "🧂 Yeast",
      "🛢 Oil",
    ],
    method: [
      "Mix flour, coconut milk, sugar, and yeast to form a dough.",
      "Let rise, then cut into triangles.",
      "Fry in hot oil until golden brown.",
    ],
    funFact: "🍩 Mandazi is a sweet East African doughnut, perfect with tea!",
  },
  {
    id: "supper11",
    name: "Couscous Royale",
    image:
      "https://th.bing.com/th/id/R.aaa88cb8e7bf0c94ccc3f521e1e72925?rik=%2bppraXoKGG4tsA&pid=ImgRaw&r=0",
    rating: 4.9,
    ingredients: [
      "🌾 Couscous",
      "🍗 Chicken",
      "🥩 Lamb",
      "🥕 Carrots",
      "🍆 Eggplant",
      "🧅 Onion",
      "🧄 Garlic",
      "🌶 Spices",
    ],
    method: [
      "Steam couscous until fluffy.",
      "Cook meats and vegetables with spices.",
      "Serve meats and veggies over couscous.",
    ],
    funFact:
      "🌾 Couscous is a North African staple, often served at celebrations!",
  },
  {
    id: "lunch12",
    name: "Thieboudienne",
    image:
      "https://travelfoodatlas.com/wp-content/uploads/2023/05/Thieboudienne-RI-480x480.jpg.webp",
    rating: 4.8,
    ingredients: [
      "🍚 Rice",
      "🐟 Fish",
      "🍅 Tomatoes",
      "🥕 Carrots",
      "🍆 Eggplant",
      "🧅 Onion",
      "🌶 Spices",
    ],
    method: [
      "Cook fish with tomato sauce and spices.",
      "Add vegetables and rice, simmer until done.",
      "Serve fish and veggies over rice.",
    ],
    funFact: "🐟 Thieboudienne is the national dish of Senegal!",
  },
  {
    id: "snack6",
    name: "Suya",
    image:
      "https://img.freepik.com/premium-photo/picture-suya_871710-28808.jpg",
    rating: 4.7,
    ingredients: ["🥩 Beef", "🌶 Suya Spice", "🧅 Onion", "🛢 Oil", "🧂 Salt"],
    method: [
      "Slice beef thinly and marinate with suya spice.",
      "Skewer and grill over open flame.",
      "Serve with onions.",
    ],
    funFact:
      "🌶 Suya is a spicy Nigerian street food, famous for its bold flavors!",
  },
  {
    id: "dessert6",
    name: "Malva Pudding",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.Hn53f_Qn4QcsJXM5qCw3OwHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.8,
    ingredients: [
      "🌾 Flour",
      "🍬 Sugar",
      "🥚 Eggs",
      "🥛 Milk",
      "🍑 Apricot Jam",
      "🧈 Butter",
    ],
    method: [
      "Mix flour, sugar, eggs, milk, and apricot jam.",
      "Bake until golden.",
      "Pour cream sauce over hot pudding and serve.",
    ],
    funFact:
      "🍮 Malva pudding is a beloved South African dessert, especially during holidays!",
  },
  {
    id: "drink5",
    name: "Chapman",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.BFrpW2_WKbMw3xkYN3IGfAHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.5,
    ingredients: [
      "🥤 Fanta",
      "🥤 Sprite",
      "🍋 Lemon",
      "🍊 Angostura Bitters",
      "🍓 Grenadine",
      "🍹 Ice",
    ],
    method: [
      "Mix Fanta, Sprite, bitters, and grenadine in a glass.",
      "Add lemon slices and ice.",
      "Serve chilled.",
    ],
    funFact:
      "🍹 Chapman is a popular Nigerian cocktail, often served at parties!",
  },
  {
    id: "lunch13",
    name: "Matoke",
    image:
      "https://www.sanjanafeasts.co.uk/wp-content/uploads/2019/04/matoke-mash-2.jpg",
    rating: 4.4,
    ingredients: [
      "🍌 Green Bananas",
      "🍅 Tomatoes",
      "🧅 Onion",
      "🛢 Oil",
      "🧂 Salt",
    ],
    method: [
      "Peel and chop green bananas.",
      "Cook with tomatoes, onions, and oil until soft.",
      "Mash and serve hot.",
    ],
    funFact: "🍌 Matoke is a staple dish in Uganda and parts of East Africa!",
  },
  {
    id: "lunch14",
    name: "Buffalo Wings",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.a_RWXri_j7-1TA9shRrvqwHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.7,
    ingredients: [
      "🍗 Chicken Wings",
      "🌶 Hot Sauce",
      "🧈 Butter",
      "🧂 Salt",
      "🥕 Celery",
      "🥒 Blue Cheese Dressing",
    ],
    method: [
      "Fry chicken wings until crispy.",
      "Toss wings in a mixture of melted butter and hot sauce.",
      "Serve with celery sticks and blue cheese dressing.",
    ],
    funFact: "🍗 Buffalo wings were invented in Buffalo, New York, in 1964!",
  },
  {
    id: "supper12",
    name: "Meatloaf",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.r-vE9OmasSeHMeG1Oc8VTAHaDl?r=0&rs=1&pid=ImgDetMain",
    rating: 4.4,
    ingredients: [
      "🥩 Ground Beef",
      "🍞 Bread Crumbs",
      "🥚 Eggs",
      "🧅 Onion",
      "🍅 Ketchup",
      "🧂 Spices",
    ],
    method: [
      "Mix ground beef, bread crumbs, eggs, onions, and spices.",
      "Shape into a loaf and top with ketchup.",
      "Bake until cooked through and serve sliced.",
    ],
    funFact:
      "🍞 Meatloaf became popular during the Great Depression as a way to stretch meat!",
  },
  {
    id: "breakfast9",
    name: "Biscuits and Gravy",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.r-vE9OmasSeHMeG1Oc8VTAHaDl?r=0&rs=1&pid=ImgDetMain",
    rating: 4.6,
    ingredients: [
      "🍞 Biscuits",
      "🥓 Sausage",
      "🥛 Milk",
      "🌾 Flour",
      "🧂 Salt",
      "🌶 Pepper",
    ],
    method: [
      "Bake biscuits until golden.",
      "Cook sausage, add flour, then milk to make gravy.",
      "Serve gravy over split biscuits.",
    ],
    funFact: "🍞 Biscuits and gravy is a Southern breakfast classic!",
  },
  {
    id: "lunch15",
    name: "Pulled Pork Sandwich",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.Cc6_iXEicf7mDX2es6Ri3gHaDt?r=0&rs=1&pid=ImgDetMain",
    rating: 4.8,
    ingredients: [
      "🐖 Pork Shoulder",
      "🌶 BBQ Sauce",
      "🍞 Buns",
      "🧅 Onion",
      "🧂 Spices",
    ],
    method: [
      "Slow-cook pork shoulder with spices until tender.",
      "Shred pork and mix with BBQ sauce.",
      "Serve on buns with sliced onions.",
    ],
    funFact: "🐖 Pulled pork is a staple of Southern barbecue!",
  },
  {
    id: "dessert7",
    name: "Apple Pie",
    image:
      "https://tse2.mm.bing.net/th/id/OIP._RSjjLXUxZwJwkX8-Fh2_wHaD5?r=0&rs=1&pid=ImgDetMain",
    rating: 4.9,
    ingredients: [
      "🍏 Apples",
      "🌾 Flour",
      "🍬 Sugar",
      "🧈 Butter",
      "🥚 Eggs",
      "🧂 Cinnamon",
    ],
    method: [
      "Prepare pie crust and fill with sliced apples, sugar, and cinnamon.",
      "Cover with top crust and bake until golden.",
      "Serve warm, often with ice cream.",
    ],
    funFact:
      "🥧 Apple pie is so American, there's a saying: 'As American as apple pie!'",
  },
  {
    id: "snack7",
    name: "Corn Dog",
    image:
      "https://img.freepik.com/premium-psd/corn-dogs-png-image-transparent-background_1022554-27.jpg",
    rating: 4.3,
    ingredients: [
      "🌭 Hot Dogs",
      "🌽 Cornmeal",
      "🌾 Flour",
      "🥚 Eggs",
      "🥛 Milk",
      "🛢 Oil",
    ],
    method: [
      "Mix cornmeal, flour, eggs, and milk to make batter.",
      "Dip hot dogs in batter and deep fry until golden.",
      "Serve on a stick, often with mustard.",
    ],
    funFact: "🌭 Corn dogs are a favorite at American fairs and carnivals!",
  },
  {
    id: "drink6",
    name: "Root Beer Float",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.lk9e2_iOJQg3Hnmhtn0YuQAAAA?r=0&rs=1&pid=ImgDetMain",
    rating: 4.7,
    ingredients: ["🥤 Root Beer", "🍦 Vanilla Ice Cream"],
    method: [
      "Scoop vanilla ice cream into a glass.",
      "Pour root beer over the ice cream.",
      "Serve immediately with a straw and spoon.",
    ],
    funFact: "🥤 The root beer float was invented in Colorado in 1893!",
  },
  {
    id: "lunch16",
    name: "Clam Chowder",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.n_-Lz2IqYDY1ejYvw9QiwgHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.5,
    ingredients: [
      "🦪 Clams",
      "🥔 Potatoes",
      "🥓 Bacon",
      "🥛 Cream",
      "🧅 Onion",
      "🌾 Flour",
    ],
    method: [
      "Cook bacon, then sauté onions and potatoes.",
      "Add clams and cream, simmer until thick.",
      "Serve hot, often with oyster crackers.",
    ],
    funFact: "🍲 New England clam chowder is famous for its creamy base!",
  },
  {
    id: "supper13",
    name: "Chicken and Waffles",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.bBr_3pZlFCJPC-Ga7sP-2wHaHa?r=0&w=1024&h=1025&rs=1&pid=ImgDetMain",
    rating: 4.8,
    ingredients: [
      "🍗 Fried Chicken",
      "🧇 Waffles",
      "🍯 Maple Syrup",
      "🧂 Spices",
    ],
    method: [
      "Fry seasoned chicken until crispy.",
      "Prepare waffles until golden.",
      "Serve chicken on waffles with maple syrup.",
    ],
    funFact:
      "🧇 Chicken and waffles is a soul food favorite, especially in the American South!",
  },
  {
    id: "dessert8",
    name: "S'mores",
    image:
      "https://th.bing.com/th?id=OIF.Va%2bq8SvjBX3B9tcu8E0QLQ&r=0&rs=1&pid=ImgDetMain",
    rating: 4.9,
    ingredients: ["🍫 Chocolate", "🍪 Graham Crackers", "🔥 Marshmallows"],
    method: [
      "Toast marshmallows over a fire.",
      "Sandwich marshmallow and chocolate between graham crackers.",
      "Enjoy warm and gooey.",
    ],
    funFact: "🔥 S'mores are a classic American campfire treat!",
  },
  {
    id: "breakfast10",
    name: "Eggs Benedict",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.1_lRWmytYPENU4lPZzsAOwHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.7,
    ingredients: [
      "🥚 Eggs",
      "🥯 English Muffins",
      "🥓 Canadian Bacon",
      "🍋 Hollandaise Sauce",
      "🧈 Butter",
    ],
    method: [
      "Poach eggs until whites are set.",
      "Toast English muffins and top with Canadian bacon.",
      "Place poached eggs on top and drizzle with hollandaise sauce.",
      "Serve immediately.",
    ],
    funFact:
      "🍳 Eggs Benedict is a brunch favorite, first served in New York City in the 1800s!",
  },
  {
    id: "lunch17",
    name: "Philly Cheesesteak",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.Nyluo9fjCPouGnGrO8iTWAHaEJ?r=0&rs=1&pid=ImgDetMain",
    rating: 4.8,
    ingredients: [
      "🥩 Thinly Sliced Beef",
      "🧀 Cheese",
      "🥖 Hoagie Roll",
      "🧅 Onion",
      "🫑 Peppers",
    ],
    method: [
      "Sauté beef, onions, and peppers on a griddle.",
      "Melt cheese over the meat.",
      "Serve in a hoagie roll.",
    ],
    funFact:
      "🥩 The Philly cheesesteak was invented in Philadelphia in the 1930s!",
  },
  {
    id: "supper14",
    name: "Pot Roast",
    image:
      "https://th.bing.com/th/id/R.907e8e0efc0e35f57f54a86d09cff2da?rik=Py91PrgXLsRDRw&pid=ImgRaw&r=0&sres=1&sresct=1",
    rating: 4.7,
    ingredients: [
      "🥩 Beef Roast",
      "🥕 Carrots",
      "🥔 Potatoes",
      "🧅 Onion",
      "🧄 Garlic",
      "🌿 Herbs",
    ],
    method: [
      "Brown beef roast in a pot.",
      "Add vegetables, broth, and herbs.",
      "Cover and slow-cook until tender.",
    ],
    funFact: "🍖 Pot roast is a classic Sunday dinner in many American homes!",
  },
  {
    id: "snack8",
    name: "Nachos",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.lAf1EGhusYCKWb-6f3ofRQAAAA?r=0&rs=1&pid=ImgDetMain",
    rating: 4.6,
    ingredients: [
      "🌽 Tortilla Chips",
      "🧀 Cheese",
      "🌶 Jalapeños",
      "🍅 Salsa",
      "🥑 Guacamole",
      "🍛 Beans",
    ],
    method: [
      "Spread chips on a baking sheet.",
      "Top with cheese and jalapeños.",
      "Bake until cheese melts.",
      "Serve with salsa, guacamole, and beans.",
    ],
    funFact:
      "🌽 Nachos were invented in Mexico but became a staple at American sports events!",
  },
  {
    id: "dessert9",
    name: "Banana Split",
    image: "https://clipground.com/images/banana-split-png-7.jpg",
    rating: 4.8,
    ingredients: [
      "🍌 Banana",
      "🍦 Ice Cream",
      "🍫 Chocolate Syrup",
      "🍒 Cherry",
      "🥜 Nuts",
      "🍦 Whipped Cream",
    ],
    method: [
      "Slice banana lengthwise and place in a dish.",
      "Add scoops of ice cream between banana halves.",
      "Top with chocolate syrup, whipped cream, nuts, and a cherry.",
    ],
    funFact: "🍌 The banana split was invented in Pennsylvania in 1904!",
  },
  {
    id: "drink7",
    name: "Iced Tea",
    image:
      "https://toppng.com/uploads/preview/iced-tea-png-file-11526028029prpafgq1sz.png",
    rating: 4.5,
    ingredients: ["🍵 Tea", "💧 Water", "🍋 Lemon", "🍬 Sugar", "🧊 Ice"],
    method: [
      "Brew tea and let cool.",
      "Pour over ice and add lemon and sugar to taste.",
      "Serve chilled.",
    ],
    funFact: "🧊 Iced tea is especially popular in the Southern United States!",
  },
  {
    id: "lunch18",
    name: "Reuben Sandwich",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.fpuE4ldAZlLZdaL7xQoObQHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.7,
    ingredients: [
      "🥪 Rye Bread",
      "🥩 Corned Beef",
      "🧀 Swiss Cheese",
      "🥬 Sauerkraut",
      "🥫 Russian Dressing",
    ],
    method: [
      "Layer corned beef, cheese, and sauerkraut on rye bread.",
      "Spread Russian dressing and grill until golden.",
      "Serve hot.",
    ],
    funFact:
      "🥪 The Reuben is a deli classic, especially in New York and the Midwest!",
  },
  {
    id: "supper15",
    name: "Jambalaya",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.2RciTAhZrfuHL7pozabIDAHaHa?r=0&w=640&h=640&rs=1&pid=ImgDetMain",
    rating: 4.8,
    ingredients: [
      "🍚 Rice",
      "🍗 Chicken",
      "🦐 Shrimp",
      "🌭 Sausage",
      "🧅 Onion",
      "🫑 Peppers",
      "🍅 Tomatoes",
      "🌶 Spices",
    ],
    method: [
      "Sauté chicken, sausage, onions, and peppers.",
      "Add rice, tomatoes, and spices.",
      "Simmer and add shrimp at the end.",
      "Cook until rice is tender.",
    ],
    funFact:
      "🍚 Jambalaya is a spicy rice dish from Louisiana, influenced by French and Spanish cuisines!",
  },
  {
    id: "dessert10",
    name: "Key Lime Pie",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.UkewHTUpGCOgeqz_3XffQQHaEs?r=0&rs=1&pid=ImgDetMain",
    rating: 4.9,
    ingredients: [
      "🥧 Graham Cracker Crust",
      "🍋 Key Lime Juice",
      "🥚 Eggs",
      "🥛 Condensed Milk",
      "🍦 Whipped Cream",
    ],
    method: [
      "Mix lime juice, eggs, and condensed milk.",
      "Pour into crust and bake until set.",
      "Chill and top with whipped cream.",
    ],
    funFact: "🥧 Key lime pie is the official state pie of Florida!",
  },
  {
    id: "snack9",
    name: "Potato Chips",
    image:
      "https://th.bing.com/th/id/R.f45e81c0bbb4c8fcdaea29d86164b6c1?rik=XntABykNRGoA9Q&pid=ImgRaw&r=0",
    rating: 4.4,
    ingredients: ["🥔 Potatoes", "🛢 Oil", "🧂 Salt"],
    method: [
      "Slice potatoes thinly.",
      "Fry in hot oil until crispy.",
      "Drain and sprinkle with salt.",
    ],
    funFact:
      "🥔 Potato chips were invented in New York in 1853 by chef George Crum!",
  },
  {
    id: "lunch19",
    name: "Lasagna",
    image:
      "https://www.pngplay.com/wp-content/uploads/9/Lasagna-PNG-Photos.png",
    rating: 4.9,
    ingredients: [
      "🍝 Lasagna Noodles",
      "🥩 Ground Beef",
      "🍅 Tomato Sauce",
      "🧀 Ricotta Cheese",
      "🧀 Mozzarella",
      "🧅 Onion",
      "🧄 Garlic",
    ],
    method: [
      "Cook noodles and prepare meat sauce.",
      "Layer noodles, sauce, and cheeses in a baking dish.",
      "Bake until bubbly and golden.",
    ],
    funFact:
      "🍝 Lasagna is one of the oldest types of pasta, dating back to Ancient Rome!",
  },
  {
    id: "supper16",
    name: "Risotto alla Milanese",
    image:
      "https://blog.giallozafferano.it/tantedelizie/wp-content/uploads/2024/02/risotto-alla-milanese.png",
    rating: 4.7,
    ingredients: [
      "🍚 Arborio Rice",
      "🧈 Butter",
      "🧅 Onion",
      "🍷 White Wine",
      "🧀 Parmesan",
      "🌼 Saffron",
      "🥣 Broth",
    ],
    method: [
      "Sauté onions in butter, add rice and toast.",
      "Add wine, then gradually add broth while stirring.",
      "Stir in saffron and finish with Parmesan.",
    ],
    funFact: "🌼 Saffron gives this risotto its signature golden color!",
  },
  {
    id: "snack10",
    name: "Bruscttahe",
    image:
      "https://www.pngall.com/wp-content/uploads/13/Bruschetta-Cheese-PNG-Pic.png",
    rating: 4.5,
    ingredients: [
      "🍞 Bread",
      "🍅 Tomatoes",
      "🧄 Garlic",
      "🫒 Olive Oil",
      "🌿 Basil",
      "🧂 Salt",
    ],
    method: [
      "Toast bread slices.",
      "Top with diced tomatoes, garlic, basil, olive oil, and salt.",
      "Serve immediately.",
    ],
    funFact:
      "🍅 Bruschetta comes from the Italian word 'bruscare,' meaning 'to roast over coals.'",
  },
  {
    id: "dessert11",
    name: "Tiramisu",
    image:
      "https://w7.pngwing.com/pngs/297/809/png-transparent-tiramisu-ladyfinger-chocolate-brownie-chocolate-cake-cheesecake-chocolate-cake-food-frozen-dessert-cuisine.png",
    rating: 4.9,
    ingredients: [
      "🍪 Ladyfingers",
      "☕ Espresso",
      "🥚 Eggs",
      "🧀 Mascarpone",
      "🍬 Sugar",
      "🍫 Cocoa Powder",
    ],
    method: [
      "Dip ladyfingers in espresso and layer in a dish.",
      "Spread mascarpone mixture over ladyfingers.",
      "Repeat layers and dust with cocoa powder.",
      "Chill before serving.",
    ],
    funFact:
      "☕ Tiramisu means 'pick me up' in Italian, thanks to its coffee content!",
  },
  {
    id: "drink8",
    name: "Espresso",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.wwgel2KUJ2B7DMvaVJ_1iQAAAA?r=0&rs=1&pid=ImgDetMain",
    rating: 4.8,
    ingredients: ["☕ Coffee Beans", "💧 Water"],
    method: [
      "Finely grind coffee beans.",
      "Brew under high pressure to extract a small, strong shot.",
      "Serve in a small cup.",
    ],
    funFact:
      "☕ Espresso is the base for many Italian coffee drinks like cappuccino and latte!",
  },
  {
    id: "breakfast11",
    name: "Frittata",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.adFPuHVVvOzaSEcz1dFIBQHaE8?r=0&rs=1&pid=ImgDetMain",
    rating: 4.6,
    ingredients: [
      "🥚 Eggs",
      "🧀 Cheese",
      "🥬 Spinach",
      "🧅 Onion",
      "🫑 Peppers",
      "🧂 Salt",
    ],
    method: [
      "Beat eggs and mix with cheese and vegetables.",
      "Pour into a skillet and cook gently.",
      "Finish under the broiler until set.",
    ],
    funFact:
      "🥚 Frittata is sometimes called an Italian omelette and is great for using leftovers!",
  },
  {
    id: "lunch20",
    name: "Caprese Salad",
    image:
      "https://static.vecteezy.com/system/resources/previews/046/430/632/non_2x/italian-caprese-salad-on-transparent-background-png.png",
    rating: 4.7,
    ingredients: [
      "🍅 Tomatoes",
      "🧀 Mozzarella",
      "🌿 Basil",
      "🫒 Olive Oil",
      "🧂 Salt",
      "⚫ Black Pepper",
    ],
    method: [
      "Slice tomatoes and mozzarella.",
      "Layer with basil leaves.",
      "Drizzle with olive oil and season with salt and pepper.",
    ],
    funFact: "🇮🇹 Caprese salad represents the colors of the Italian flag!",
  },
  {
    id: "supper17",
    name: "Osso Buco",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/757/815/large_2x/ossobuco-with-ai-generated-free-png.png",
    rating: 4.8,
    ingredients: [
      "🍖 Veal Shanks",
      "🥕 Carrots",
      "🧅 Onion",
      "🍅 Tomatoes",
      "🍷 White Wine",
      "🥣 Broth",
      "🌿 Herbs",
    ],
    method: [
      "Brown veal shanks and sauté vegetables.",
      "Add wine, broth, and tomatoes.",
      "Simmer until meat is tender.",
    ],
    funFact:
      "🍖 Osso buco means 'bone with a hole,' referring to the marrow bone in the shank!",
  },
  {
    id: "dessert12",
    name: "Panna Cotta",
    image:
      "https://static.vecteezy.com/system/resources/previews/047/600/312/non_2x/panna-cotta-with-raspberries-and-raspberry-sauce-png.png",
    rating: 4.7,
    ingredients: [
      "🥛 Cream",
      "🍬 Sugar",
      "🍦 Vanilla",
      "🍓 Berries",
      "🍋 Lemon Zest",
    ],
    method: [
      "Heat cream, sugar, and vanilla until sugar dissolves.",
      "Add gelatin and pour into molds.",
      "Chill until set and serve with berries.",
    ],
    funFact:
      "🍮 Panna cotta means 'cooked cream' in Italian and is a classic northern dessert!",
  },
  {
    id: "lunch21",
    name: "Paella",
    image:
      "https://e7.pngegg.com/pngimages/864/256/png-clipart-spanish-cuisine-paella-spain-spanish-omelette-tapas-cooking-food-seafood.png",
    rating: 4.9,
    ingredients: [
      "🍚 Rice",
      "🦐 Shrimp",
      "🐔 Chicken",
      "🦑 Squid",
      "🫑 Peppers",
      "🧅 Onion",
      "🧄 Garlic",
      "🌿 Saffron",
      "🫒 Olive Oil",
    ],
    method: [
      "Sauté chicken, seafood, and vegetables in olive oil.",
      "Add rice and saffron, then pour in broth.",
      "Simmer until rice is cooked and liquid is absorbed.",
      "Garnish and serve hot.",
    ],
    funFact:
      "🥘 Paella originated in Valencia and is Spain's most famous rice dish!",
  },
  {
    id: "supper18",
    name: "Tortilla Española",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.XQ64ipxNgVUmYpsqgBy5jAHaFH?r=0&rs=1&pid=ImgDetMain",
    rating: 4.7,
    ingredients: [
      "🥔 Potatoes",
      "🥚 Eggs",
      "🧅 Onion",
      "🫒 Olive Oil",
      "🧂 Salt",
    ],
    method: [
      "Thinly slice potatoes and onions.",
      "Fry in olive oil until soft.",
      "Mix with beaten eggs and cook in a pan until set.",
      "Flip and cook the other side. Slice and serve.",
    ],
    funFact:
      "🍳 Tortilla Española is a staple in Spanish homes and tapas bars!",
  },
  {
    id: "snack13",
    name: "Patatas Bravas",
    image:
      "https://img.freepik.com/psd-premium/patatas-bravas-png-fondo-transparente_484256-4631.jpg",
    rating: 4.5,
    ingredients: ["🥔 Potatoes", "🛢 Oil", "🌶 Spicy Tomato Sauce", "🧂 Salt"],
    method: [
      "Cut potatoes into cubes and fry until crispy.",
      "Top with spicy tomato sauce.",
      "Serve hot as a tapa.",
    ],
    funFact: "🌶 Patatas bravas are one of Spain's most popular tapas!",
  },
  {
    id: "dessert13",
    name: "Churros con Chocolate",
    image:
      "https://th.bing.com/th/id/R.d9afabea48a68ee999a43aa5e65200c4?rik=7JlabNpUrcI5Fg&pid=ImgRaw&r=0",
    rating: 4.8,
    ingredients: [
      "🌾 Flour",
      "💧 Water",
      "🧂 Salt",
      "🛢 Oil",
      "🍫 Chocolate",
      "🍬 Sugar",
    ],
    method: [
      "Mix flour, water, and salt to form dough.",
      "Pipe dough into hot oil and fry until golden.",
      "Roll in sugar and serve with thick hot chocolate.",
    ],
    funFact:
      "🍫 Churros are a favorite Spanish breakfast or snack, especially dipped in chocolate!",
  },
  {
    id: "drink9",
    name: "Sangria",
    image:
      "https://th.bing.com/th/id/R.ed2d20fb36a351c45514df104c1fbfbd?rik=uYG%2fq8G52%2fEuRw&riu=http%3a%2f%2fcustomdistributors.com%2fwp-content%2fuploads%2f2017%2f12%2fCerkl_RedSnapper.jpg&ehk=21dgwYkTm0N%2fJh3zifIYi6CFUVSrZ02sgFr2nzjKK4E%3d&risl=&pid=ImgRaw&r=0",
    rating: 4.6,
    ingredients: [
      "🍷 Red Wine",
      "🍊 Orange",
      "🍋 Lemon",
      "🍎 Apple",
      "🍬 Sugar",
      "🥤 Soda Water",
    ],
    method: [
      "Mix wine, chopped fruits, and sugar in a pitcher.",
      "Chill for several hours.",
      "Add soda water before serving.",
    ],
    funFact:
      "🍷 Sangria is a refreshing Spanish punch, perfect for summer gatherings!",
  },
  {
    id: "lunch22",
    name: "Gazpacho",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.9tWfCJ46kcnXOQmJYap2uwHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.4,
    ingredients: [
      "🍅 Tomatoes",
      "🥒 Cucumber",
      "🫑 Peppers",
      "🧅 Onion",
      "🧄 Garlic",
      "🫒 Olive Oil",
      "🍞 Bread",
      "🧂 Salt",
    ],
    method: [
      "Blend tomatoes, cucumber, peppers, onion, garlic, bread, and olive oil.",
      "Season with salt and chill.",
      "Serve cold, garnished with diced vegetables.",
    ],
    funFact:
      "🥒 Gazpacho is a cold soup from Andalusia, perfect for hot Spanish summers!",
  },
  {
    id: "snack14",
    name: "Croquetas",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.c1GiyRk4myRdg2sZO8M8xAHaFV?r=0&rs=1&pid=ImgDetMain",
    rating: 4.7,
    ingredients: [
      "🥛 Milk",
      "🌾 Flour",
      "🧈 Butter",
      "🥩 Ham (or Chicken)",
      "🥚 Eggs",
      "🍞 Bread Crumbs",
      "🛢 Oil",
    ],
    method: [
      "Make a thick béchamel sauce with milk, flour, and butter.",
      "Mix in chopped ham or chicken.",
      "Shape into logs, coat with egg and bread crumbs.",
      "Fry until golden brown.",
    ],
    funFact:
      "🥩 Croquetas are a beloved Spanish tapa, crispy outside and creamy inside!",
  },
  {
    id: "breakfast13",
    name: "Pan con Tomate",
    image:
      "https://th.bing.com/th/id/R.dc3ef4ad26298a67c6906aa7f6b755ce?rik=TDgMhUyfos08Zg&pid=ImgRaw&r=0",
    rating: 4.3,
    ingredients: [
      "🍞 Bread",
      "🍅 Tomato",
      "🧄 Garlic",
      "🫒 Olive Oil",
      "🧂 Salt",
    ],
    method: [
      "Toast bread slices.",
      "Rub with garlic and ripe tomato.",
      "Drizzle with olive oil and sprinkle with salt.",
    ],
    funFact:
      "🍅 Pan con tomate is a simple Catalan breakfast or tapa,highlighting fresh ingredients!",
  },
  {
    id: "lunch23",
    name: "Bocadillo de Calamares",
    image:
      "https://th.bing.com/th/id/R.f4625d243288955ab3019c6f3d643b30?rik=I%2bu1dTmLSDcdWw&pid=ImgRaw&r=0",
    rating: 4.5,
    ingredients: [
      "🦑 Fried Calamari",
      "🥖 Baguette",
      "🧂 Salt",
      "🫒 Olive Oil",
    ],
    method: [
      "Fry calamari rings until golden.",
      "Serve in a crusty baguette with a drizzle of olive oil and salt.",
    ],
    funFact:
      "🦑 Bocadillo de calamares is a popular Madrid street food, especially near Plaza Mayor!",
  },
  {
    id: "supper19",
    name: "Albóndigas",
    image:
      "https://th.bing.com/th/id/OIP.7AhTRs9SMF2XZcjQVNoLqQHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain",
    rating: 4.6,
    ingredients: [
      "🥩 Ground Meat",
      "🍚 Rice",
      "🍅 Tomato Sauce",
      "🧅 Onion",
      "🧄 Garlic",
      "🌿 Herbs",
    ],
    method: [
      "Mix ground meat with rice, onions, garlic, and herbs.",
      "Shape into balls and cook in tomato sauce.",
      "Serve hot with bread or rice.",
    ],
    funFact:
      "🍖 Albóndigas are Spanish meatballs, often served as a tapa or main dish!",
  },
  {
    id: "lunch24",
    name: "Butter Chicken",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.VNGIi_nqP_qL5HNKS0lnmQHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.9,
    ingredients: [
      "🍗 Chicken",
      "🍅 Tomato Puree",
      "🧈 Butter",
      "🥛 Cream",
      "🧄 Garlic",
      "🧅 Onion",
      "🌶 Spices",
    ],
    method: [
      "Marinate chicken with spices and yogurt.",
      "Cook chicken and set aside.",
      "Prepare tomato-based sauce with butter and cream.",
      "Combine chicken and sauce, simmer, and serve with naan or rice.",
    ],
    funFact:
      "🍗 Butter chicken was invented in Delhi in the 1950s by accident when leftover chicken was mixed with a rich tomato gravy!",
  },
  {
    id: "supper20",
    name: "Palak Paneer",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.9hDCGobAYlbaQd4eZsOjYgHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.7,
    ingredients: [
      "🥬 Spinach",
      "🧀 Paneer",
      "🧅 Onion",
      "🧄 Garlic",
      "🫚 Ginger",
      "🌶 Spices",
    ],
    method: [
      "Blanch and blend spinach.",
      "Sauté onions, garlic, and ginger with spices.",
      "Add spinach puree and paneer cubes.",
      "Simmer and serve hot with roti or rice.",
    ],
    funFact:
      "🥬 Palak paneer is a North Indian favorite, packed with protein and iron!",
  },
  {
    id: "snack15",
    name: "Samosa",
    image:
      "https://wallpapers.com/images/featured/samosa-png-h6porf9uuoxije6w.png",
    rating: 4.8,
    ingredients: ["🥔 Potatoes", "🌿 Peas", "🌶 Spices", "🌾 Flour", "🛢 Oil"],
    method: [
      "Prepare spicy potato and pea filling.",
      "Wrap in dough triangles.",
      "Deep fry until golden and crispy.",
      "Serve with chutney.",
    ],
    funFact:
      "🥟 Samosas are enjoyed across South Asia and the Middle East, but originated in Central Asia!",
  },
  {
    id: "dessert14",
    name: "Gulab Jamun",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.SfUGqEdO9-T5Yz5gvWXtcwHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.9,
    ingredients: [
      "🥛 Milk Powder",
      "🌾 Flour",
      "🧈 Ghee",
      "🍬 Sugar",
      "🌹 Rose Water",
    ],
    method: [
      "Make dough from milk powder, flour, and ghee.",
      "Shape into balls and deep fry.",
      "Soak in warm sugar syrup flavored with rose water.",
      "Serve warm or chilled.",
    ],
    funFact:
      "🍬 Gulab jamun is a festival favorite, especially during Diwali and Eid!",
  },
  {
    id: "drink11",
    name: "Masala Chai",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.UaEmqjrlgvxpxG4zNti98wHaFj?r=0&rs=1&pid=ImgDetMain",
    rating: 4.8,
    ingredients: [
      "🍵 Black Tea",
      "🥛 Milk",
      "🍬 Sugar",
      "🌿 Spices (Cardamom, Ginger, Cloves)",
    ],
    method: [
      "Boil water with tea and spices.",
      "Add milk and sugar, simmer.",
      "Strain and serve hot.",
    ],
    funFact:
      "🍵 Masala chai is sold by 'chai wallahs' on every street corner in India!",
  },
  {
    id: "breakfast14",
    name: "Idli with Sambar",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.EgvwMW2WFxOsqDpV606RqwHaHa?r=0&rs=1&pid=ImgDetMain",
    rating: 4.6,
    ingredients: [
      "🌾 Rice",
      "🫘 Urad Dal",
      "🧂 Salt",
      "🥕 Vegetables",
      "🌶 Spices",
    ],
    method: [
      "Soak and grind rice and dal, ferment overnight.",
      "Steam batter into fluffy idlis.",
      "Serve with spicy lentil sambar and coconut chutney.",
    ],
    funFact:
      "🥥 Idli is a staple South Indian breakfast, light and easy to digest!",
  },
  {
    id: "lunch25",
    name: "Biryani",
    image:
      "https://static.vecteezy.com/system/resources/previews/033/225/992/non_2x/biryani-isolated-on-background-png.png",
    rating: 4.9,
    ingredients: [
      "🍚 Basmati Rice",
      "🍗 Chicken or 🥩 Mutton",
      "🧅 Onion",
      "🧄 Garlic",
      "🫚 Ginger",
      "🌶 Spices",
      "🧈 Ghee",
    ],
    method: [
      "Marinate meat with spices and yogurt.",
      "Layer partially cooked rice and meat in a pot.",
      "Cook on low heat (dum) until flavors meld.",
      "Serve with raita.",
    ],
    funFact:
      "🍚 Biryani has Persian roots and is now a beloved dish across India with many regional styles!",
  },
  {
    id: "supper21",
    name: "Chole Bhature",
    image:
      "https://png.pngtree.com/png-clipart/20231120/original/pngtree-chole-bhature-is-a-food-dish-png-image_13662996.png",
    rating: 4.7,
    ingredients: [
      "🫘 Chickpeas",
      "🧅 Onion",
      "🍅 Tomato",
      "🌶 Spices",
      "🌾 Flour",
      "🛢 Oil",
    ],
    method: [
      "Cook chickpeas in spicy tomato gravy.",
      "Prepare dough and roll into bhature (fried bread).",
      "Fry bhature until puffed and golden.",
      "Serve hot with chole.",
    ],
    funFact:
      "🥙 Chole bhature is a popular North Indian street food, especially in Delhi and Punjab!",
  },
  {
    id: "lunch26",
    name: "Kung Pao Chicken",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.uK6Gh2I-HVmqlT20LWqJngHaHa?r=0&w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.8,
    ingredients: [
      "🍗 Chicken",
      "🥜 Peanuts",
      "🌶 Dried Chilies",
      "🧅 Green Onion",
      "🧄 Garlic",
      "🫛 Bell Pepper",
      "🛢 Soy Sauce",
    ],
    method: [
      "Marinate chicken and stir-fry until browned.",
      "Add vegetables, chilies, and peanuts.",
      "Stir in sauce and cook until thickened.",
      "Serve hot with rice.",
    ],
    funFact:
      "🌶 Kung Pao Chicken is named after a Qing Dynasty official and is famous for its spicy, nutty flavor!",
  },
  {
    id: "supper22",
    name: "Mapo Tofu",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.POTNjNe_N5R5kbCehHuIUQHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.7,
    ingredients: [
      "🍲 Tofu",
      "🥩 Ground Pork",
      "🧄 Garlic",
      "🧅 Green Onion",
      "🌶 Chili Bean Paste",
      "🛢 Soy Sauce",
      "🌶 Sichuan Peppercorn",
    ],
    method: [
      "Sauté pork with garlic and chili bean paste.",
      "Add tofu and simmer in sauce.",
      "Sprinkle with Sichuan peppercorn and green onions.",
      "Serve with steamed rice.",
    ],
    funFact:
      "🌶 Mapo Tofu is a signature Sichuan dish known for its numbing and spicy flavors!",
  },
  {
    id: "snack16",
    name: "Spring Rolls",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.4YGxL8oI_zq6l06Y7irQSwHaE7?r=0&w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.6,
    ingredients: [
      "🥕 Carrot",
      "🥬 Cabbage",
      "🍄 Mushrooms",
      "🌾 Spring Roll Wrappers",
      "🛢 Oil",
      "🧂 Soy Sauce",
    ],
    method: [
      "Stir-fry vegetables and season.",
      "Wrap filling in spring roll wrappers.",
      "Deep fry until golden and crispy.",
      "Serve with dipping sauce.",
    ],
    funFact:
      "🥢 Spring rolls are a popular snack during Chinese New Year, symbolizing wealth and prosperity!",
  },
  {
    id: "dessert15",
    name: "Mango Pudding",
    image:
      "https://nourishingmeals.com/sites/default/files/styles/fullscreen_banner/public/blogspot/mango%2Bpudding31.jpg?h=a32b3037&itok=ImdHS3vj",
    rating: 4.7,
    ingredients: ["🥭 Mango", "🥛 Milk", "🍬 Sugar", "🍮 Gelatin"],
    method: [
      "Blend mango with milk and sugar.",
      "Mix in dissolved gelatin.",
      "Pour into molds and chill until set.",
      "Serve cold, often with fresh mango.",
    ],
    funFact:
      "🥭 Mango pudding is a favorite dessert in Hong Kong and Chinese banquets!",
  },
  {
    id: "drink12",
    name: "Bubble Tea",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.QfhIBcuNEi-dy0VjHSnzMAHaNx?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.8,
    ingredients: [
      "🧋 Tapioca Pearls",
      "🍵 Tea",
      "🥛 Milk",
      "🍬 Sugar",
      "🧊 Ice",
    ],
    method: [
      "Cook tapioca pearls until chewy.",
      "Brew tea and mix with milk and sugar.",
      "Add pearls and ice to a cup.",
      "Serve with a wide straw.",
    ],
    funFact:
      "🧋 Bubble tea originated in Taiwan and is now a global sensation!",
  },
  {
    id: "breakfast15",
    name: "Congee",
    image:
      "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2014/2/1/0/congee.jpg.rend.hgtvcom.1280.853.suffix/1452647394488.jpeg",
    rating: 4.5,
    ingredients: [
      "🍚 Rice",
      "💧 Water",
      "🧂 Salt",
      "🥚 Egg (optional)",
      "🥩 Pork (optional)",
      "🧅 Green Onion",
    ],
    method: [
      "Simmer rice in plenty of water until creamy.",
      "Add toppings like egg, pork, or green onion.",
      "Serve hot for breakfast.",
    ],
    funFact:
      "🍚 Congee is a comforting rice porridge enjoyed across China, especially in the morning!",
  },
  {
    id: "lunch27",
    name: "Sweet and Sour Pork",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.dzSHkyLJTREFaxdh7OPaugHaDf?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.7,
    ingredients: [
      "🐖 Pork",
      "🍍 Pineapple",
      "🫛 Bell Pepper",
      "🧅 Onion",
      "🍅 Ketchup",
      "🍬 Sugar",
      "🛢 Vinegar",
    ],
    method: [
      "Batter and fry pork pieces.",
      "Stir-fry with vegetables and pineapple.",
      "Add sweet and sour sauce and toss to coat.",
      "Serve with steamed rice.",
    ],
    funFact:
      "🍍 Sweet and sour pork is a Cantonese classic, loved for its tangy and colorful sauce!",
  },
  {
    id: "supper23",
    name: "Beef Chow Fun",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.UNyK1JW31Lc3oHXin-Bj1AHaLH?r=0&w=630&h=945&rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.6,
    ingredients: [
      "🥩 Beef",
      "🍜 Rice Noodles",
      "🧅 Green Onion",
      "🫛 Bean Sprouts",
      "🛢 Soy Sauce",
      "🧄 Garlic",
    ],
    method: [
      "Marinate and stir-fry beef until tender.",
      "Add noodles, vegetables, and sauce.",
      "Toss over high heat until smoky and well mixed.",
      "Serve hot.",
    ],
    funFact:
      "🍜 Beef chow fun is a staple of Cantonese cuisine, famous for its 'wok hei' (breath of the wok) flavor!",
  },
];

export default foodList;
