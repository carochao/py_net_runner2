export interface TaskSolution {
  code: string;
  explanation: string;
  commonMistakes: string[];
}

export const CREATIVE_TASK_SOLUTIONS: Record<string, TaskSolution> = {
  'eggs-powerful': {
    code: `print("Eggs are powerful.")`,
    explanation: `Outputs the required sentence using a standard print function with quotes.`,
    commonMistakes: [`Missing quotes around the string`, `Typo in 'Eggs are powerful.'`]
  },
  'two-sentences': {
    code: `print("Gregg loves big elbows")\nprint("Graham hates Parma ham")`,
    explanation: `Executes two separate print statements to output on two distinct lines.`,
    commonMistakes: [`Putting both in a single print without newline`, `Spelling errors in Gregg or Graham`]
  },
  'comma-oneline': {
    code: `print("Gregg loves big elbows, Graham hates Parma ham")`,
    explanation: `Prints both phrases on a single line separated by a comma.`,
    commonMistakes: [`Using two separate print calls instead of comma separation`]
  },
  'tv-show-input': {
    code: `favourite_show = input("What is your favourite TV show? ")`,
    explanation: `Prompts user using input() and saves result to a variable.`,
    commonMistakes: [`Forgetting to assign the input to a variable`]
  },
  'tv-show-echo': {
    code: `show = input("Enter favourite TV show: ")\nprint(show)`,
    explanation: `Collects input into a variable and immediately prints that variable.`,
    commonMistakes: [`Wrapping variable in quotes inside print: print("show")`]
  },
  'movie-context-newline': {
    code: `movie = input("What's your favourite movie? ")\nprint("So your favourite movie is:")\nprint(movie)`,
    explanation: `Asks for movie, prints explanatory sentence, then outputs the variable on the next line.`,
    commonMistakes: [`Combining into one line when separate lines were requested`]
  },
  'movie-context-comma': {
    code: `movie = input("What is your favourite movie? ")\nprint("So your favourite movie is:", movie)`,
    explanation: `Uses comma separation in print to output message and variable on one line with auto spacing.`,
    commonMistakes: [`Forgetting the comma or using string concatenation with wrong spacing`]
  },
  'gokart-registration': {
    code: `first_name = input("Enter first name: ")\nmiddle_name = input("Enter middle name: ")\nlast_name = input("Enter last name: ")\nemail = input("Enter email: ")\naddress = input("Enter address: ")\npostcode = input("Enter postcode: ")\n\nprint(f"Welcome {first_name} {middle_name} {last_name}!")\nprint(f"Email: {email}, Address: {address}, Postcode: {postcode}")`,
    explanation: `Prompts for 6 distinct details and prints confirmation message.`,
    commonMistakes: [`Missing some of the 6 inputs`, `Not printing the collected details`]
  },
  'best-console-var': {
    code: `bestConsole = "PS Vita"`,
    explanation: `Declares a variable named bestConsole and assigns the string value "PS Vita".`,
    commonMistakes: [`Typo in variable name (e.g. bestconsole vs bestConsole)`, `Missing quotes around "PS Vita"`]
  },
  'best-console-echo': {
    code: `bestConsole = "PS Vita"\nprint(bestConsole)`,
    explanation: `Assigns "PS Vita" to bestConsole and outputs it using print.`,
    commonMistakes: [`Printing the literal string "bestConsole" instead of variable bestConsole`]
  },
  'best-console-input': {
    code: `bestConsole = input("Enter best console name: ")`,
    explanation: `Gathers the console name dynamically via input().`,
    commonMistakes: [`Hardcoding instead of using input()`]
  },
  'console-age-casting': {
    code: `bestConsole = input("Enter console: ")\nconsoleAge = int(input("Enter console age: "))\nprint(bestConsole, consoleAge)`,
    explanation: `Casts age to an integer using int() and prints both console and age.`,
    commonMistakes: [`Forgetting int() casting for numerical input`]
  },
  'console-portable-boolean': {
    code: `bestConsole = "PS Vita"\nconsoleAge = 12\nportable = True\nprint(bestConsole, consoleAge, portable)`,
    explanation: `Creates string, integer, and boolean variables, then prints all three.`,
    commonMistakes: [`Quoting True as "True" instead of using the boolean literal True`]
  },
  'five-datatypes': {
    code: `name = "Cyber"\nage = 25\nweight = 72.5\nis_active = True\nskills = ["Python", "Algorithms"]\nprint(name, age, weight, is_active, skills)`,
    explanation: `Declares five distinct primitive & collection datatypes: str, int, float, bool, list.`,
    commonMistakes: [`Reusing same data type instead of 5 different ones`]
  },
  'story-protocol': {
    code: `hero = input("Hero name: ")\nplace = input("Place: ")\nenemy = input("Enemy: ")\nweapon = input("Weapon: ")\ngoal = input("Goal: ")\n\nprint(f"Once upon a time in {place}, {hero} stood against {enemy}.")\nprint(f"Armed with a {weapon}, the mission to {goal} had finally begun.")`,
    explanation: `Collects 5 story elements and constructs two rich narrative paragraphs.`,
    commonMistakes: [`Fewer than 5 inputs collected`]
  },
  'add-three-numbers': {
    code: `num1 = 10\nnum2 = 20\nnum3 = 30\ntotal = num1 + num2 + num3\nprint(total)`,
    explanation: `Sums three numbers and prints the result.`,
    commonMistakes: [`Printing literal string "total" instead of numerical variable`]
  },
  'input-add-three-numbers': {
    code: `n1 = int(input("First number: "))\nn2 = int(input("Second number: "))\nn3 = int(input("Third number: "))\nprint(n1 + n2 + n3)`,
    explanation: `Takes three integer inputs, adds them together, and prints sum.`,
    commonMistakes: [`Forgetting int() casting, causing string concatenation`]
  },
  'add-two-sub-one': {
    code: `n1 = int(input("First: "))\nn2 = int(input("Second: "))\nn3 = int(input("Third: "))\nresult = (n1 + n2) - n3\nprint(result)`,
    explanation: `Adds first two integers, subtracts third integer, prints output.`,
    commonMistakes: [`Operator precedence or subtraction error`]
  },
  'rectangle-area': {
    code: `width = int(input("Enter width: "))\nheight = int(input("Enter height: "))\narea = width * height\nprint(area)`,
    explanation: `Multiplies width by height to calculate rectangle area.`,
    commonMistakes: [`Using addition instead of multiplication (*)`]
  },
  'average-floats': {
    code: `f1 = float(input("First decimal: "))\nf2 = float(input("Second decimal: "))\nf3 = float(input("Third decimal: "))\navg = (f1 + f2 + f3) / 3\nprint(avg)`,
    explanation: `Reads three floats using float(), computes sum divided by 3, and prints average.`,
    commonMistakes: [`Forgetting parentheses around (f1 + f2 + f3)`]
  },
  'division-remainder': {
    code: `num1 = int(input("Top number: "))\nnum2 = int(input("Bottom number: "))\nremainder = num1 % num2\nprint(remainder)`,
    explanation: `Uses modulo operator (%) to find remainder of division.`,
    commonMistakes: [`Using / instead of %`]
  },
  'division-integer': {
    code: `num1 = int(input("Top number: "))\nnum2 = int(input("Bottom number: "))\nresult = num1 // num2\nprint(result)`,
    explanation: `Performs floor division using // to discard decimal remainder.`,
    commonMistakes: [`Using single slash / which returns a float`]
  },
  'odd-or-even': {
    code: `n = int(input("Enter integer: "))\nif n % 2 == 0:\n    print("EVEN")\nelse:\n    print("ODD")`,
    explanation: `Checks if n % 2 equals 0 to determine parity.`,
    commonMistakes: [`Missing colon : after if/else`]
  },
  'less-than-ten': {
    code: `num = int(input("Enter number: "))\nif num < 10:\n    print("your number is less than 10")\nelse:\n    print("your number is either equal to, or bigger than 10")`,
    explanation: `Compares value to 10 and prints appropriate feedback for both branches.`,
    commonMistakes: [`Misspelling comparison branch messages`]
  },
  'mega-dosh': {
    code: `num1 = int(input("First amount: "))\nnum2 = int(input("Second amount: "))\ntotal = num1 + num2\nif total >= 100:\n    print("Mega Dosh")\nelse:\n    print("Get back to work")`,
    explanation: `Calculates sum and tests if at least 100 with >= operator.`,
    commonMistakes: [`Using > instead of >=`]
  },
  'bean-opinion': {
    code: `food = input("What's your favorite food? ")\nif food != "Beans":\n    print("You are a BEAN")\nelse:\n    print("Peak, you have good taste.")`,
    explanation: `Tests if string does not equal "Beans".`,
    commonMistakes: [`Comparing with wrong case, e.g. "beans" instead of "Beans"`]
  },
  'parity-verdict': {
    code: `num = int(input("Number: "))\nif num % 2 == 0:\n    print("EVEN")\nelse:\n    print("ODD")`,
    explanation: `Evaluates modulo 2 and prints uppercase EVEN or ODD.`,
    commonMistakes: [`Lowercasing 'even' or 'odd'`]
  },
  'gta-eight-check': {
    code: `age = int(input("Enter your age: "))\nageAppropriate = False\nif age >= 18:\n    ageAppropriate = True\nprint("Allowed:", ageAppropriate)`,
    explanation: `Sets boolean flag ageAppropriate based on age >= 18.`,
    commonMistakes: [`Using string "True" instead of boolean literal True`]
  },
  'secure-login-v1': {
    code: `databaseUsername = "admin"\ndatabasePassword = "secret"\nuser = input("Username: ")\npwd = input("Password: ")\nif databaseUsername == user and databasePassword == pwd:\n    print("login successful")\nelse:\n    print("Get out you dirty hacker")`,
    explanation: `Compares entered credentials against database credentials with compound and statement.`,
    commonMistakes: [`Using single = assignment instead of == comparison`]
  },
  'grade-mark': {
    code: `mark = int(input("Enter mark: "))\nif mark < 30:\n    print("fail")\nelif mark <= 49:\n    print("pass")\nelif mark <= 74:\n    print("merit")\nelif mark <= 90:\n    print("Distinction")\nelse:\n    print("Distinction Star")`,
    explanation: `Applies sequential grade boundaries using if/elif chain.`,
    commonMistakes: [`Reversing condition order`]
  },
  'grade-mark-validator': {
    code: `mark = int(input("Enter mark: "))\nif mark < 0 or mark > 100:\n    print("invalid mark")\nelif mark < 30:\n    print("fail")\nelif mark <= 49:\n    print("pass")\nelif mark <= 74:\n    print("merit")\nelif mark <= 90:\n    print("Distinction")\nelse:\n    print("Distinction Star")`,
    explanation: `Guards against out-of-range values (<0 or >100) before grading.`,
    commonMistakes: [`Missing boundary condition at the start`]
  },
  'big-john-for': {
    code: `for i in range(10):\n    print("Big John")`,
    explanation: `Runs a for loop 10 times using range(10).`,
    commonMistakes: [`Using wrong range boundary`]
  },
  'big-john-while': {
    code: `count = 0\nwhile count < 10:\n    print("Big John")\n    count += 1`,
    explanation: `Increments counter in while loop until reaching 10.`,
    commonMistakes: [`Missing count += 1`]
  },
  'count-0-10-for': {
    code: `for i in range(11):\n    print(i)`,
    explanation: `Prints 0 through 10 inclusive with range(11).`,
    commonMistakes: [`Stopping at range(10)`]
  },
  'count-0-10-while': {
    code: `count = 0\nwhile count <= 10:\n    print(count)\n    count += 1`,
    explanation: `Prints count while <= 10 and increments.`,
    commonMistakes: [`Using count < 10`]
  },
  'input-until-greater-10': {
    code: `n = int(input("Enter number: "))\nwhile n <= 10:\n    n = int(input("Enter number greater than 10: "))\nprint("Valid:", n)`,
    explanation: `Keeps looping while input is <= 10.`,
    commonMistakes: [`Missing internal loop input statement`]
  },
  'count-interval-2-for': {
    code: `for i in range(0, 101, 2):\n    print(i)`,
    explanation: `Iterates by 2 from 0 to 100 using range(0, 101, 2).`,
    commonMistakes: [`Omitting third parameter (step)`]
  },
  'odd-numbers-for': {
    code: `for i in range(1, 101, 2):\n    print(i)`,
    explanation: `Iterates odd numbers with range(1, 101, 2).`,
    commonMistakes: [`Starting at 0`]
  },
  'odd-numbers-while': {
    code: `num = 1\nwhile num < 100:\n    print(num)\n    num += 2`,
    explanation: `Advances counter by 2 inside while loop.`,
    commonMistakes: [`Incrementing by 1`]
  },
  'friends-array-for': {
    code: `friends = ["Alice", "Bob", "Charlie"]\nfor friend in friends:\n    print(friend)`,
    explanation: `Loops through array of 3 friend names with for loop.`,
    commonMistakes: [`Not initializing friends list with 3 elements`]
  },
  'friends-array-while': {
    code: `friends = ["Alice", "Bob", "Charlie"]\ni = 0\nwhile i < len(friends):\n    print(friends[i])\n    i += 1`,
    explanation: `Iterates over 3-item list using while loop index.`,
    commonMistakes: [`Index out of bounds with <= len()`]
  },
  'celebs-grid-for': {
    code: `celebs = [\n    ["Actor", "Leonardo", "USA"],\n    ["Singer", "Adele", "UK"],\n    ["Athlete", "Messi", "Argentina"]\n]\nfor row in celebs:\n    for item in row:\n        print(item)`,
    explanation: `Traverses 2D matrix using nested for loops.`,
    commonMistakes: [`Printing row instead of cell item`]
  },
  'celebs-grid-while': {
    code: `celebs = [\n    ["Actor", "Leonardo"],\n    ["Singer", "Adele"]\n]\nr = 0\nwhile r < len(celebs):\n    c = 0\n    while c < len(celebs[r]):\n        print(celebs[r][c])\n        c += 1\n    r += 1`,
    explanation: `Traverses 2D matrix using nested while loops with index resets.`,
    commonMistakes: [`Forgetting to reset inner index c = 0`]
  },
  'string-scanner-for': {
    code: `text = "Kung Pao Chicken"\nfor char in text:\n    print(char)`,
    explanation: `Prints each character on a separate line.`,
    commonMistakes: [`Iterating range without string indexing`]
  },
  'string-scanner-while': {
    code: `text = "Kung Pao Chicken"\ni = 0\nwhile i < len(text):\n    print(text[i])\n    i += 1`,
    explanation: `Indexes each character sequentially with while loop.`,
    commonMistakes: [`Using <= len instead of < len`]
  },
  'nineteen-and-fives': {
    code: `numbers = [19, 5, 5, 19, 5, 12, 19, 8]\ncount_19 = numbers.count(19)\ncount_5 = numbers.count(5)\nprint("19 count:", count_19)\nprint("5 count:", count_5)\nif count_19 == 2 and count_5 >= 3:\n    print("Match criteria met!")`,
    explanation: `Calculates occurrences using .count() method on list.`,
    commonMistakes: [`Using len instead of .count()`]
  },
  'differ-by-ten': {
    code: `data = list(range(100))\nfor i in range(len(data) - 1):\n    diff = abs(data[i] - data[i+1])\nprint("Verified 100 items")`,
    explanation: `Compares adjacent elements in 100-item array without index overflow.`,
    commonMistakes: [`Index out of bounds on data[i+1]`]
  },
  'four-distinct-no-repeats': {
    code: `items = [1, 2, 3, 4]\nhas_adjacent_dupes = False\nfor i in range(len(items) - 1):\n    if items[i] == items[i+1]:\n        has_adjacent_dupes = True\nprint("Distinct:", not has_adjacent_dupes)`,
    explanation: `Checks adjacent elements for duplicate values.`,
    commonMistakes: [`Comparing i to i instead of i+1`]
  },
  'procedure-bob': {
    code: `def greet():\n    print("Bob")\n\ngreet()`,
    explanation: `Defines procedure with def that prints "Bob" and calls it.`,
    commonMistakes: [`Missing procedure call`]
  },
  'function-bob': {
    code: `def get_bob():\n    return "Bob"\n\nprint(get_bob())`,
    explanation: `Defines function returning "Bob" and prints its invocation.`,
    commonMistakes: [`Printing inside the function instead of returning`]
  },
  'procedure-add-params': {
    code: `def add_numbers(a, b):\n    print(a + b)\n\nadd_numbers(15, 25)`,
    explanation: `Accepts two parameters and prints their sum.`,
    commonMistakes: [`Returning value instead of printing directly`]
  },
  'function-input-multiply': {
    code: `def multiply(a, b):\n    return a * b\n\nx = int(input("First: "))\ny = int(input("Second: "))\nprint(multiply(x, y))`,
    explanation: `Converts input to int, multiplies, returns result and prints.`,
    commonMistakes: [`Omitting int() casting`]
  },
  'procedure-full-name': {
    code: `def greet_fullname(first, last):\n    print("So your full name is:", first, last)\n\nfname = input("First name: ")\nlname = input("Last name: ")\ngreet_fullname(fname, lname)`,
    explanation: `Gathers two inputs and passes to procedure displaying full name greeting.`,
    commonMistakes: [`Missing 'So your full name is' phrasing`]
  },
  'username-length-check': {
    code: `def verify_username(u):\n    if len(u) > 5 and len(u) < 15:\n        return "Valid"\n    else:\n        return "Invalid"\n\nuser_input = input("Enter username: ")\nprint(verify_username(user_input))`,
    explanation: `Validates string length using len() and returns "Valid" or "Invalid".`,
    commonMistakes: [`Printing inside function instead of returning string`]
  },
  'username-symbols-check': {
    code: `def verify_strict(u):\n    if len(u) <= 5 or len(u) >= 15:\n        return "Invalid"\n    if "@" in u or "!" in u or "#" in u:\n        return "Invalid"\n    return "Valid"\n\nprint(verify_strict(input("Username: ")))`,
    explanation: `Checks for disallowed characters (@, !, #) and validates length.`,
    commonMistakes: [`Missing symbol checks`]
  },
  'credentials-double-check': {
    code: `def guard(u, p):\n    u_ok = len(u) > 5 and len(u) < 15 and "@" not in u and "!" not in u and "#" not in u\n    p_ok = len(p) >= 8 and len(p) <= 20\n    if u_ok and p_ok:\n        return "Valid"\n    elif not u_ok:\n        return "Username invalid"\n    else:\n        return "Password Invalid"\n\nuser = input("Username: ")\npwd = input("Password: ")\nprint(guard(user, pwd))`,
    explanation: `Audits username and password constraints returning descriptive failure messages.`,
    commonMistakes: [`Incorrect return message capitalization`]
  },
  'password-capital-check': {
    code: `def check_password(p):\n    for char in p:\n        if char.isupper():\n            return "Valid"\n    return "Invalid"\n\npwd = input("Enter password: ")\nprint(check_password(pwd))`,
    explanation: `Checks each character with .isupper() and returns "Valid" or "Invalid".`,
    commonMistakes: [`Calling isupper() on whole string instead of individual character`]
  },
  'graham-biscuits-loop': {
    code: `def output_slogan():\n    print("Graham has the best biscuits")\n\ni = 0\nwhile i < 7:\n    output_slogan()\n    i += 1`,
    explanation: `Calls procedure 7 times using a while loop.`,
    commonMistakes: [`Using for loop when challenge explicitly requests while loop`]
  },
  'animal-array-third': {
    code: `animals = ["Cat", "Dog", "Capybara", "Lion", "Tiger"]\n\ndef select_animal(arr):\n    return arr[2]\n\nprint(select_animal(animals))`,
    explanation: `Defines function returning element at index 2 of provided list.`,
    commonMistakes: [`Returning index 3 instead of 2`]
  },
  'add-seven-array': {
    code: `nums = [1, 2, 3, 4, 5, 6, 7]\n\ndef add_seven(arr):\n    for i in range(len(arr)):\n        arr[i] += 7\n    return arr\n\nprint(add_seven(nums))`,
    explanation: `Loops over list indices adding 7 to each item and returns list.`,
    commonMistakes: [`Returning before loop finishes`]
  },
  'two-number-calc': {
    code: `def add(a, b): return a + b\ndef subtract(a, b): return a - b\ndef multiply(a, b): return a * b\ndef divide(a, b): return a // b\n\nnum1 = int(input("Num 1: "))\nnum2 = int(input("Num 2: "))\nop = input("Operation (add, subtract, multiply, divide): ")\n\nif op == "add":\n    print("Your answer is:", add(num1, num2))\nelif op == "subtract":\n    print("Your answer is:", subtract(num1, num2))\nelif op == "multiply":\n    print("Your answer is:", multiply(num1, num2))\nelif op == "divide":\n    print("Your answer is:", divide(num1, num2))`,
    explanation: `Routes user arithmetic operation through named functions and outputs answer.`,
    commonMistakes: [`Missing 'Your answer is' output template`]
  },
  'calculator-roids': {
    code: `def calc():\n    while True:\n        op = input("Op (+,-,*,/ or quit): ")\n        if op == "quit": break\n        a = float(input("Num 1: "))\n        b = float(input("Num 2: "))\n        if op == "+": print(a + b)\n        elif op == "-": print(a - b)\n        elif op == "*": print(a * b)\n        elif op == "/": print(a / b)\n\ncalc()`,
    explanation: `Wraps calculator in while True loop with exit option.`,
    commonMistakes: [`Forgetting loop termination`]
  },
  'barclays-banking-system': {
    code: `accounts = [\n    ["alice", "pass1", 100.0],\n    ["bob", "pass2", 250.50],\n    ["charlie", "pass3", 50.0],\n    ["david", "pass4", 999.0],\n    ["eve", "pass5", 1250.0],\n    ["frank", "pass6", 5.0],\n    ["grace", "pass7", 77.7]\n]\n\ndef loginButton(username, password):\n    for acc in accounts:\n        if acc[0] == username and acc[1] == password:\n            print("login successful")\n            return acc\n    print("login failed")\n    return None\n\nactive = True\nwhile active:\n    choice = input("Enter choice (1-login, 0-exit): ")\n    if choice == "0":\n        active = False\n    elif choice == "1":\n        u = input("Username: ")\n        p = input("Password: ")\n        loginButton(u, p)`,
    explanation: `Implements banking loginButton function and menu loop.`,
    commonMistakes: [`Omitting required function name loginButton`]
  },
  'spongebob-trio-index': {
    code: `characters = ["SpongeBob", "Patrick", "Squidward"]\nprint(characters[1])`,
    explanation: `Indexes 2nd character using characters[1].`,
    commonMistakes: [`Using index [2] instead of [1]`]
  },
  'spongebob-trio-while': {
    code: `characters = ["SpongeBob", "Patrick", "Squidward"]\ni = 0\nwhile i < len(characters):\n    print(characters[i])\n    i += 1`,
    explanation: `Outputs character array using while loop.`,
    commonMistakes: [`Infinite loop from omitting increment`]
  },
  'spongebob-trio-for': {
    code: `characters = ["SpongeBob", "Patrick", "Squidward"]\nfor character in characters:\n    print(character)`,
    explanation: `Direct iteration over character list with for-in.`,
    commonMistakes: [`Complex range expression when simple for-in works best`]
  },
  'spongebob-nephew': {
    code: `characters = ["SpongeBob", "Patrick", "Squidward", "Sandy"]\nprint(characters[2])\ncharacters[2] = "Mr Krabs Nephew – Graham"\nprint(characters[2])`,
    explanation: `Demonstrates list mutability by updating item at index 2.`,
    commonMistakes: [`Not matching exact replacement string including en-dash`]
  },
  'spongebob-backwards-decology': {
    code: `characters = ["SpongeBob", "Patrick", "Squidward", "Sandy", "Plankton", "Gary", "Pearl", "Krabs", "Karen", "Larry"]\ni = len(characters) - 1\nwhile i >= 0:\n    print(characters[i])\n    i -= 1`,
    explanation: `Prints list backwards with descending while loop.`,
    commonMistakes: [`Stopping at 1 instead of 0`]
  },
  'spongebob-even-indexes': {
    code: `characters = ["SpongeBob", "Patrick", "Squidward", "Sandy", "Plankton", "Gary"]\nfor i in range(0, len(characters), 2):\n    print(characters[i])`,
    explanation: `Steps through list indices by 2 to access even positions.`,
    commonMistakes: [`Visiting odd indices`]
  },
  'spongebob-weight-grid': {
    code: `matrix = [\n    ["SpongeBob", 5],\n    ["Patrick", 180],\n    ["Squidward", 45]\n]\nfor row in matrix:\n    for val in row:\n        print(val)`,
    explanation: `Iterates through 2D array cells using nested loops.`,
    commonMistakes: [`Single loop printing full rows`]
  },
  'spongebob-chunky-fish': {
    code: `characters = [\n    ["SpongeBob", 5],\n    ["Patrick", 180],\n    ["Squidward", 45]\n]\nfor c in characters:\n    if c[1] > 150:\n        print("Who’s a chunky boy? It is", c[0])\n    print(c[0])`,
    explanation: `Tests sublist element at index 1 and prints chunky message if weight > 150.`,
    commonMistakes: [`Testing name index 0 instead of weight index 1`]
  },
  'spongebob-ocean-population': {
    code: `import random\nnames = ["SpongeBob", "Patrick", "Squidward", "Sandy"]\npopulation = []\nfor _ in range(1000):\n    population.append(random.choice(names))\nprint("Generated", len(population), "residents")`,
    explanation: `Generates 1000 items with random.choice and appends to list.`,
    commonMistakes: [`Forgetting import random`]
  },
  'spongebob-population-ages': {
    code: `import random\nnames = ["SpongeBob", "Patrick", "Squidward", "Sandy"]\ndemographics = []\nfor _ in range(1000):\n    demographics.append([random.choice(names), random.randint(1, 80)])\nprint("Total profiles:", len(demographics))`,
    explanation: `Populates 1000 [name, age] sublists in 2D array.`,
    commonMistakes: [`Flat list instead of 2D records`]
  },
  "adv-caesar-cipher": {
    code: "# ADVANCED LAB 01: Caesar Cipher Engine\n# Build a function that shifts letters along the alphabet:\n\ndef encrypt_caesar(text, shift):\n    result = \"\"\n    alphabet = \"abcdefghijklmnopqrstuvwxyz\"\n    \n    for char in text:\n        is_upper = char.isupper()\n        lower_char = char.lower()\n        if lower_char in alphabet:\n            idx = alphabet.index(lower_char)\n            new_idx = (idx + shift) % 26\n            new_char = alphabet[new_idx]\n            result += new_char.upper() if is_upper else new_char\n        else:\n            result += char\n            \n    return result\n\n# Test run:\nsecret = \"CYBER_PROTOCOL_DELTA_9\"\ncipher = encrypt_caesar(secret, 4)\nprint(\"Original:\", secret)\nprint(\"Encrypted:\", cipher)\n",
    explanation: "Shifts letters modulo 26 preserving uppercase/lowercase, while leaving punctuation, spaces, and numbers untouched.",
    commonMistakes: ["Failing to wrap around Z with modulo 26","Changing spaces or punctuation"]
  },
  "adv-binary-search": {
    code: "# ADVANCED LAB 02: Binary Search Algorithm\n# Implement divide-and-conquer search on a sorted collection:\n\ndef binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n    step = 1\n    \n    while low <= high:\n        mid = (low + high) // 2\n        print(f\"Step {step}: low={low}, mid={mid}, high={high}, val={arr[mid]}\")\n        \n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n        step += 1\n        \n    return -1\n\nnumbers = [3, 8, 15, 24, 39, 52, 67, 81, 95, 110]\nprint(\"Sorted Array:\", numbers)\n\ntarget = 67\nindex = binary_search(numbers, target)\nprint(f\"Target {target} found at index: {index}\")\n",
    explanation: "Classic divide-and-conquer search maintaining low and high bounds, recalculating midpoint and halving the search space each step in O(log n).",
    commonMistakes: ["Using low < high instead of low <= high","Not sorting or assuming unsorted input"]
  },
  "adv-prime-sieve": {
    code: "# ADVANCED LAB 03: Prime Factorization\n# Write a function that decomposes an integer into prime factors:\n\ndef prime_factors(n):\n    factors = []\n    # Extract factor 2\n    while n % 2 == 0:\n        factors.append(2)\n        n = n // 2\n        \n    # Extract odd factors\n    d = 3\n    while d * d <= n:\n        while n % d == 0:\n            factors.append(d)\n            n = n // d\n        d += 2\n        \n    if n > 1:\n        factors.append(n)\n        \n    return factors\n\ntest_numbers = [84, 180, 360]\nfor num in test_numbers:\n    decomp = prime_factors(num)\n    equation = \" * \".join(str(f) for f in decomp)\n    print(f\"{num} = {equation}\")\n",
    explanation: "Decomposes an integer into its prime factors using trial division starting from 2 upwards.",
    commonMistakes: ["Not dividing out repeated factors completely (e.g. 2 * 2)","Looping past sqrt(n) inefficiently"]
  },
  "adv-bracket-validator": {
    code: "# ADVANCED LAB 04: Bracket Balance Parser\n# Use a Stack data structure to validate paired syntax tokens:\n\ndef is_balanced(expr):\n    stack = []\n    matching = {')': '(', ']': '[', '}': '{'}\n    \n    for char in expr:\n        if char in \"([{\":\n            stack.append(char)\n        elif char in \")]}\":\n            if not stack:\n                return False\n            top = stack.pop()\n            if top != matching[char]:\n                return False\n                \n    return len(stack) == 0\n\ntest_cases = [\n    \"{ [ ( ) ( ) ] }\",\n    \"def calculate(x, y): return [x + y, {x: y}]\",\n    \"{ [ ( ] ) }\",\n    \"((())\",\n    \"([]{})\"\n]\n\nfor test in test_cases:\n    valid = is_balanced(test)\n    status = \"BALANCED\" if valid else \"UNBALANCED\"\n    print(f\"[{status}] -> {test}\")\n",
    explanation: "Uses a LIFO Stack to push opening brackets and pop/match corresponding closing brackets, ensuring proper nesting.",
    commonMistakes: ["Popping an empty stack on an unmatched closer","Forgetting to check if stack is empty at the end"]
  },
  "adv-frequency-analyzer": {
    code: "# ADVANCED LAB 05: Frequency Histogram Engine\n# Clean raw text, tabulate word counts, and render ASCII histogram bars:\n\ntext = \"\"\"Python is a high-level general-purpose programming language. \nPython emphasizes code readability with use of significant indentation. \nPython is dynamically typed and garbage-collected.\"\"\"\n\n# 1. Clean and tokenize\nclean_text = \"\"\nfor char in text.lower():\n    if char.isalnum() or char.isspace():\n        clean_text += char\n    else:\n        clean_text += \" \"\n\nwords = clean_text.split()\n\n# 2. Count word frequencies\nfreq = {}\nfor w in words:\n    freq[w] = freq.get(w, 0) + 1\n\n# 3. Sort by count in descending order\nsorted_words = sorted(freq.items(), key=lambda item: item[1], reverse=True)\n\nprint(\"--- WORD FREQUENCY TELEMETRY ---\")\nfor word, count in sorted_words[:6]:\n    bar = \"█\" * count\n    print(f\"{word.ljust(15)}: {bar} ({count})\")\n",
    explanation: "Cleans punctuation from text, normalizes to lowercase, counts word frequencies in a dictionary, and renders ASCII horizontal bar charts.",
    commonMistakes: ["Failing to strip commas, periods, or question marks","Case mismatch between \"Python\" and \"python\""]
  },
  "adv-inventory-ledger": {
    code: "# ADVANCED LAB 06: OOP Inventory Ledger\n# Create a class to encapsulate product records, stock, and transactions:\n\nclass Product:\n    def __init__(self, name, price, stock):\n        self.name = name\n        self.price = price\n        self.stock = stock\n\n    def purchase(self, qty):\n        if qty <= self.stock:\n            self.stock -= qty\n            total = qty * self.price\n            print(f\"Purchased {qty}x {self.name} for USD {total:.2f}. Remaining: {self.stock}\")\n            return total\n        else:\n            print(f\"FAILED: Insufficient stock for {self.name}! Requested {qty}, available: {self.stock}\")\n            return None\n\n    def restock(self, qty):\n        self.stock += qty\n        print(f\"Restocked +{qty} units of {self.name}. Current stock: {self.stock}\")\n\n    def get_summary(self):\n        return f\"{self.name.ljust(18)} | Price: USD {self.price:>6.2f} | Stock: {self.stock}\"\n\n# Initialize inventory\ninventory = [\n    Product(\"Cyber Deck\", 499.99, 5),\n    Product(\"Neural Jack\", 89.50, 12),\n    Product(\"Quantum Core\", 1250.00, 2)\n]\n\nprint(\"--- INITIAL INVENTORY ---\")\nfor p in inventory:\n    print(p.get_summary())\n\nprint(\"\n--- TRANSACTIONS ---\")\ninventory[0].purchase(2)\ninventory[2].purchase(3)  # Should fail\ninventory[2].restock(5)\ninventory[2].purchase(3)  # Should succeed now\n",
    explanation: "Object-oriented Product class encapsulating SKU details, unit price, and stock levels with purchase and restock transaction methods.",
    commonMistakes: ["Allowing stock to drop below zero on purchase","Missing self references in class methods"]
  },
  "adv-palindrome-anagram": {
    code: "# ADVANCED LAB 07: Palindromes and Anagrams\n# Write string analysis functions with normalization:\n\ndef is_palindrome(text):\n    # Keep only letters and digits, lowercase\n    clean = \"\".join(ch.lower() for ch in text if ch.isalnum())\n    return clean == clean[::-1]\n\ndef are_anagrams(s1, s2):\n    c1 = \"\".join(sorted(ch.lower() for ch in s1 if ch.isalnum()))\n    c2 = \"\".join(sorted(ch.lower() for ch in s2 if ch.isalnum()))\n    return c1 == c2\n\n# Test Palindromes\nphrases = [\n    \"A man, a plan, a canal: Panama!\",\n    \"No lemon, no melon\",\n    \"Python Programming\"\n]\n\nprint(\"--- PALINDROME ANALYSIS ---\")\nfor p in phrases:\n    print(f\"'{p}' -> {is_palindrome(p)}\")\n\n# Test Anagrams\npairs = [\n    (\"listen\", \"silent\"),\n    (\"Astronomer\", \"Moon starer\"),\n    (\"cyber\", \"robot\")\n]\n\nprint(\"\n--- ANAGRAM ANALYSIS ---\")\nfor w1, w2 in pairs:\n    print(f\"'{w1}' & '{w2}' -> {are_anagrams(w1, w2)}\")\n",
    explanation: "Normalizes strings by stripping whitespace and punctuation. Palindromes check clean == clean[::-1]; anagrams check sorted(str1) == sorted(str2).",
    commonMistakes: ["Not ignoring case or spacing when comparing","Comparing length alone for anagrams"]
  },
  "adv-bubble-sort-visualizer": {
    code: "# ADVANCED LAB 08: Bubble Sort Telemetry\n# Implement sorting without built-in functions, measuring comparisons:\n\ndef bubble_sort(arr):\n    data = list(arr)  # Copy array\n    n = len(data)\n    total_swaps = 0\n    total_comparisons = 0\n    \n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            total_comparisons += 1\n            if data[j] > data[j + 1]:\n                data[j], data[j + 1] = data[j + 1], data[j]\n                total_swaps += 1\n                swapped = True\n                \n        print(f\"Pass {i + 1}: {data}\")\n        if not swapped:\n            print(\"Array fully sorted early!\")\n            break\n            \n    print(f\"Metrics: {total_comparisons} comparisons, {total_swaps} swaps.\")\n    return data\n\nunsorted_data = [64, 34, 25, 12, 22, 11, 90]\nprint(\"Original:\", unsorted_data)\nsorted_result = bubble_sort(unsorted_data)\nprint(\"Sorted Result:\", sorted_result)\n",
    explanation: "Executes adjacent comparisons and swaps across multiple passes, tracking telemetry metrics and breaking early if no swaps occurred.",
    commonMistakes: ["Missing the inner loop range boundary n - i - 1","Not copying the array, mutating the caller input"]
  },
  "adv-fibonacci-matrix": {
    code: "# ADVANCED LAB 09: Fibonacci & The Golden Ratio\n# Generate terms and track convergence towards phi (1.6180339):\n\ndef generate_fibonacci(n):\n    if n <= 0:\n        return []\n    if n == 1:\n        return [0]\n        \n    fib = [0, 1]\n    while len(fib) < n:\n        fib.append(fib[-1] + fib[-2])\n    return fib\n\nPHI = 1.6180339887\nn_terms = 15\nterms = generate_fibonacci(n_terms)\n\nprint(f\"Generated {n_terms} Fibonacci Terms:\")\nprint(terms)\n\nprint(\"\n--- RATIO CONVERGENCE (F_n / F_{n-1}) ---\")\nfor i in range(2, len(terms)):\n    ratio = terms[i] / terms[i - 1]\n    diff = abs(ratio - PHI)\n    print(f\"F({i:2d})={terms[i]:<4d} / F({i-1:2d})={terms[i-1]:<4d} = {ratio:.6f}  (diff: {diff:.6f})\")\n",
    explanation: "Generates consecutive Fibonacci terms and computes the ratio of successive terms to show convergence towards the Golden Ratio (phi ≈ 1.6180339).",
    commonMistakes: ["Off-by-one in starting terms [0, 1]","Zero division on initial terms"]
  },
  "adv-roman-converter": {
    code: "# ADVANCED LAB 10: Roman Numeral Encoder\n# Use ordered greedy threshold subtraction to generate Roman Numerals:\n\ndef to_roman(num):\n    # Ordered mapping from largest to smallest\n    val_map = [\n        (1000, \"M\"), (900, \"CM\"), (500, \"D\"), (400, \"CD\"),\n        (100, \"C\"), (90, \"XC\"), (50, \"L\"), (40, \"XL\"),\n        (10, \"X\"), (9, \"IX\"), (5, \"V\"), (4, \"IV\"),\n        (1, \"I\")\n    ]\n    \n    roman = \"\"\n    for val, symbol in val_map:\n        while num >= val:\n            roman += symbol\n            num -= val\n            \n    return roman\n\ntest_values = [4, 44, 99, 400, 1994, 2024, 3999]\nfor val in test_values:\n    res = to_roman(val)\n    print(f\"{val:>4} -> {res}\")\n",
    explanation: "Greedy algorithm traversing ordered (value, symbol) pairs including subtractive cases (CM, CD, XC, XL, IX, IV) and subtracting while num >= val.",
    commonMistakes: ["Missing subtractive pairs (e.g. 4 as IIII instead of IV)","Incorrect ordering of numeral tables"]
  },
  "adv-rle-compression": {
    code: "# ADVANCED LAB 11: Run-Length Compression Engine\n# Build encoder and decoder for repeating data streams:\n\ndef compress_rle(text):\n    if not text:\n        return \"\"\n    encoded = \"\"\n    count = 1\n    \n    for i in range(1, len(text)):\n        if text[i] == text[i - 1]:\n            count += 1\n        else:\n            encoded += f\"{count}{text[i - 1]}\"\n            count = 1\n    encoded += f\"{count}{text[-1]}\"\n    return encoded\n\ndef decompress_rle(encoded):\n    decoded = \"\"\n    count_str = \"\"\n    for char in encoded:\n        if char.isdigit():\n            count_str += char\n        else:\n            count = int(count_str) if count_str else 1\n            decoded += char * count\n            count_str = \"\"\n    return decoded\n\n# Test pipeline\nraw_data = \"WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB\"\ncompressed = compress_rle(raw_data)\nrestored = decompress_rle(compressed)\n\nprint(\"Original length  :\", len(raw_data))\nprint(\"Compressed length:\", len(compressed))\nprint(\"Compressed text  :\", compressed)\nprint(\"Restored matches :\", restored == raw_data)\nratio = (len(compressed) / len(raw_data)) * 100\nprint(f\"Compressed size is {ratio:.1f}% of original size\")\n",
    explanation: "Run-Length Encoding algorithm that compresses consecutive repeating characters into count+char tokens, with a matching decompression decoder.",
    commonMistakes: ["Not appending the final run after the loop completes","Handling single-character strings"]
  },
  "adv-matrix-rotation": {
    code: "# ADVANCED LAB 12: 2D Matrix Rotation Engine\n# Rotate a square grid 90 degrees clockwise:\n\ndef rotate_90_clockwise(mat):\n    n = len(mat)\n    # Step 1: Transpose matrix (swap rows and columns)\n    transposed = [[mat[c][r] for c in range(n)] for r in range(n)]\n    \n    # Step 2: Reverse each row\n    rotated = [row[::-1] for row in transposed]\n    return rotated\n\ndef print_matrix(mat, title):\n    print(f\"--- {title} ---\")\n    for row in mat:\n        print(\"  \" + \"  \".join(f\"{val:>2}\" for val in row))\n\n# Initial 3x3 Grid\ngrid = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\nprint_matrix(grid, \"ORIGINAL 3x3\")\nrot1 = rotate_90_clockwise(grid)\nprint_matrix(rot1, \"ROTATED 90° CLOCKWISE\")\nrot2 = rotate_90_clockwise(rot1)\nprint_matrix(rot2, \"ROTATED 180° CLOCKWISE\")\n",
    explanation: "Rotates an N x N matrix 90 degrees clockwise by first transposing (swapping mat[r][c] with mat[c][r]), then reversing each row.",
    commonMistakes: ["Swapping elements twice during transposition","Reversing columns instead of rows"]
  }
};
