


The CPU Inside Your Computer

0:00

Inside every desktop computer, smartphone,  gaming console, laptop, or practically any  

0:06

other device you use on a daily basis is a CPU  or Central Processing Unit, and in this video,  

0:14

we’re going to see how they work. A typical  processor for a powerful laptop like this one  

0:20

is built from billions of nanoscopic transistors  connected together using dozens of layers of wires  

0:27

and is essentially the brain of the device. But before we explore the microprocessor and  

0:34

all its complexity, let’s travel to the early days  of personal computers and video game consoles and  

0:41

compare the Apple 2e from 1983 to the modern-day  MacBook Pro. Inside the Apple 2e we find a chip  

0:49

called a 6502, which is considered one of the  great-grandparents of all modern processors.  

0:56

This chip is built from 4528 transistors and can  perform around 430 thousand calculations a second.  

1:06

While it could only run primitive applications  and video games with simple graphics, this  

1:12

chip was the backbone of a generation of early  computers and video game consoles such as the NES,  

1:19

the Commodore 64, and the Atari. Compare that to  the MacBook Pro’s M1 processor which is built from  

1:28

16 billion transistors capable of performing  around 3 trillion calculations a second,  

1:35

thus enabling it to generate expansive  3D worlds with immersive graphics. 

1:41

Despite these two chips being released around 45  years apart, the underlying principles of how they  
The Technological DNA of CPUs
-----------------------------

1:47

work are rather similar. In a way, you can think  of these devices as sharing a common section of  

1:53

technological DNA. In fact, if we were to open  up a desktop computer and grab the CPU or the GPU  

2:01

inside the graphics card, or teardown a Nintendo  Switch or Smartphone and find the system on a chip  

2:08

or SoC, or even if you could make your way into  an AI Data Center and grab a state-of-the-art AI  

2:15

chip, you’d find that all of these processors  operate using the same underlying principles.  

2:23

In other words, both the Oregon Trail of  50 years ago and advanced AI algorithms  

2:29

run on processors with similar  technological DNA, but of course,  

2:34

one of these chips is 10 billion times more  computationally powerful than the other. 

2:41

So, in this video, we’re going to take apart  this microprocessor and find out exactly what  

2:47

the shared technological DNA is and how it  enables CPUs to work. And just to be clear,  

2:54

the technological DNA is not transistors and it’s  not logic gates, but rather it’s an architectural  

3:03

design and basic operational principle that’s  fundamental to microprocessors and differentiates  

3:10

these chips from other integrated circuits.  So, stick around, and let’s dive right in. 

3:24

This video is sponsored by Brilliant. Let’s begin with a quick 3D animated  
Teardown of a Laptop
--------------------

3:31

teardown of this Macbook Pro. When we open it up,  we find a range of different components such as  

3:37

the touchpad, battery cells, speakers, a cooling  fan, and the motherboard in the center. Mounted to  

3:45

the motherboard are the solid state drive or SSD  Storage chips where all your files are saved and  

3:52

a range of other chips. Underneath the heat pipe,  we find the DRAM which is the short term working  

3:59

memory and central processing unit. Let’s desolder  the DRAM and CPU and open it up. Inside we find  

4:07

three parts: on the top is a protective cover that  conducts and dissipates heat, on the bottom is an  

4:14

interposer with thousands of connection points  on either side and wires running inside of it,  

4:20

and soldered onto the interposer is the integrated  circuit or IC which is also called a die and is  

4:28

the functional part of the CPU. On the die we can  see the complex design of billions of transistors  

4:35

and wires organized into different sections  such as the 4 high-performance computational  
A CPU Die
---------

4:42

cores, 4 energy-efficient cores, graphics  processing cores, cache memory and many other  

4:49

sections. Let’s zoom in on one of the performance  cores where we find that it’s separated into  

4:56

different functional blocks which we’ll add labels  to and then reorganize into an architectural  

5:02

diagram. This diagram illustrates how data and  instructions move around a single processing core  

5:09

in the CPU and, although it’s rather complicated,  you’ll understand how it works by the end of this  

5:16

video. But for now, let’s zoom in even further  to get a nanoscopic view of a massive multilayer  

5:22

labyrinth of wires with the transistors at  the very bottom. Here we see a group of 6  

5:28

transistors that are wired together to build an  AND logic gate, and in this view we can see around  

5:36

650 transistors out of the total 16 billion  that make up the overall chip. Understanding  

5:44

how billions of transistors work together to  build a CPU capable of playing video games,  

5:51

watching movies or browsing the internet will take  a bit of work, so let’s start with an analogy. 

5:58

You may have heard that CPUs are like super  powerful calculators. This analogy is only around  
Analogy of a CPU
----------------

6:05

20% complete as it’s missing some critical  parts, so let’s add them in to make a more  

6:12

accurate analogy. First, we’ll add a table for the  calculator to sit on, along with a pencil and a  

6:18

sheet of paper. Next, we’ll add rows and rows of  bookshelves containing thousands of books along  

6:26

with a cart that can carry a small stack of books  between the shelves and the table. And finally,  

6:33

we’ll add an automated robot which we’ll call  a control unit or controller. The controller  

6:40

can grab books from the bookshelves, move them to  the cart and onto the table, and it can put them  

6:46

back. The controller can also read the contents  of each book, write on the paper and in the books,  

6:53

and use the calculator. You can think of the  controller as a super-fast human, but we’re bad  

7:00

at animating humans, so it’s a robot instead. And  with that, we have all the parts for our analogy. 

7:07

Now let’s see how each part of our CPU analogy  works. To start, the bookshelves are the storage  
Explaining the CPU Analogy
--------------------------

7:15

devices in your computer, such as the SSD chips ,  the cart represents the DRAM , and the table and  

7:23

its contents represent the CPU. On the CPU Table,  there’s a small space for a single open book which  

7:31

is similar to the very limited capacity  of the cache memory inside the CPU itself. 

7:37

Next, the single sheet of paper represents  the Registers which are used for storing  

7:43

values or numbers that are actively being used.  Specifically, on it are four general-purpose  

7:50

registers and a few more special locations which  we’ll discuss in a little bit. Additionally,  

7:57

the pencil is there to write and erase  things on the paper and in the books.  Finally, the calculator represents the Arithmetic  Logic Unit or ALU. This ALU calculator works using  

8:10

binary so there are only the digits zero and  one and it can do simple functions like add,  

8:17

subtract or multiply two numbers. The  ALU calculator has many more functions  

8:23

that you may be unfamiliar with but are still  rather simple. For example, it can increase or  

8:30

decrease a number by one or the ALU can perform  bit shifts which is essentially taking a number  

8:37

and adding a zero to the end of it. In decimal,  bit shifting is like multiplying a number by 10  

8:44

but in binary it’s equivalent to multiplying a  number by two. The ALU can also perform logic  

8:51

functions on two numbers such as the logical  AND, OR, or Exclusive OR operations. For example,  

8:59

here is the logical AND operation for 2 binary  inputs and you can see that the output is the  

9:06

logical AND for each place value of the 2 inputs. However, more importantly, the ALU calculator can  

9:14

perform comparisons. For example, you can  input two numbers and hit the comparison  

9:20

button to test whether the numbers are equal to  one another and, if they are, then an equals flag  

9:27

goes up while the other comparison flags like  less than or greater than stay down. Finally,  

9:34

the ALU calculator’s display that outputs the  result has a special name called the accumulator. 

9:41

So now that we’ve explained the various parts of  this analogy, how does it all work together? Well,  
How do CPUs Complete Instructions?
----------------------------------

9:48

the first step is to load a program that we want  to run, which is like moving a set of books from  

9:53

the bookshelves to the cart, and then moving a  single book to the table and opening it up. It’s  

10:00

important to note that the DRAM cart and cache  memory on the table are both temporary and limited  

10:07

capacity locations, whereas the SSD bookshelves  can hold a lot more and are semi-permanent long  

10:14

term storage. Additionally, when the computer is  turned off, there are no books in the DRAM or the  

10:21

CPU, but when the computer turns on, the cart and  table are very actively shuffling books around. 

10:29

Let’s take a look at the contents of one of the  books. Essentially, there are two types of pages:  

10:35

instructions and data. You can think of the  instructions as the directions in a cookbook, with  

10:41

each step numbered sequentially across the pages.  And, the pages of data contain a list of addresses  

10:48

with values stored at each address and are like  the ingredients that go into the recipe itself.  

10:55

Similar to cooking, you need both the  recipe and ingredients to make it work,  

11:00

and just a few ingredients can be combined  in dozens of different ways using different  

11:06

recipes. But to not use an analogy inside  another analogy, let’s drop the cooking one  

11:13

and focus on the books, table and calculator. Let’s start at the beginning of this program  

11:19

and flip to page one instruction one, which is  called a ‘Load’ and is the most common type of  

11:25

instruction. This ‘load’ has us open the pages  of data and find a specific address. We then copy  

11:34

and write down the value stored at that address  into one of the general purpose registers on the  

11:40

sheet of paper. With instruction one completed, we  move to instruction two, which is to increment the  

11:48

value in register zero by 1. So, we plug the value  into the ALU calculator and hit plus 1. The third  

11:57

instruction, called a ‘store’ instruction, is  used to save or store the output of the calculator  

12:03

found in the accumulator display into the pages  of data in the same address it was in before.  

12:10

These simple yet very common instructions are  equivalent to this line of code. Next we move  

12:18

onto instruction 4 and complete it and then  instruction 5 and so on, moving through the  

12:24

list of instructions which goes on and on and on. In order to keep track of which instruction is  

12:31

the next one to be completed, we use one of the  special locations on the sheet of paper that we  
The Program Counter
-------------------

12:37

mentioned earlier called the Program Counter or  PC, also called an Instruction Address Register  

12:44

or Instruction Pointer. Since the PC currently  has a value of 5, we find instruction 5,  

12:52

complete it, and increase the program counter  by one. Therefore, the next instruction to be  

12:59

completed will be instruction 6. However, what if  after completing instruction 6, we want to jump  

13:06

directly to instruction 42? Well, to do this  we use a jump instruction at 7 which directly  

13:14

sets the value in the program counter to a new  number and in this case it’s 42. As a result, the  

13:22

sequence of instructions will be 5, 6, 7 which is  the jump instruction, then 42, 43, 44 and so on. 

13:32

A similar set of instructions is called a  conditional branch which is used for implementing  
Loops and Branches
------------------

13:38

IF statements, loops, and other conditional code.  Let’s use an example of a FOR loop with a few  

13:45

simple lines of code inside of it. Quite simply,  this loop is used to repeat the code inside of it  

13:52

4 times. Here are the corresponding instructions  of the FOR loop along with the instructions for  

13:59

the code inside of it and we color coded each of  the elements to keep track of which specific lines  

14:05

of code result in the corresponding instructions.  We’ll discuss how compilers turn code into  

14:11

instruction later in this video, but for now  let’s focus on the FOR loop and its instructions.  

14:17

Specifically, here’s where ‘i’ gets set to 0  and stored in an address in the pages of data,  

14:25

here’s where ‘i’ is loaded from that address  and incremented by one, and here’s the contents  

14:31

of the loop. At the top, you can see the three  instructions, Load, Compare, and Branch greater  

14:38

than or Equal to. The Load first grabs the value  for ‘i’ and places it into register 0. Compare  

14:47

feeds ‘i’ stored in register 0 and a value of 4  into the ALU and compares them, resulting in the  

14:55

applicable comparison flags being triggered. Next,  branch greater than or equal to checks whether  

15:03

either the greater than or the equals flag is on,  and if it is, it sets the program counter to 23,  

15:11

which corresponds to completing and leaving  the loop. However when ‘i’ is less than 4 th  

15:18

ose flags aren’t triggered and the loop continues,  until it hits the jump instruction at address 22,  

15:26

where the jump sets the program counter to 6  which corresponds to the top of the for loop. As  

15:33

a result the loop will repeat a total of 4 times. Note that this code on the left is in C++,  

15:42

whereas the actual instructions completed by your  CPU are in a binary language called machine code,  

15:49

and the semi-readable version of the instructions  is called assembly, but we modified this assembly  

15:56

a little bit to make it more readable. One interesting note is that you may   think that with everything a computer can do  there must be tens of thousands of different  
All Possible Instructions
-------------------------

16:06

instructions. Well actually the 6502 processor  in the Apple 2e from 1983 could only complete 56  

16:16

different instructions whereas the modern M1 chip  in the MacBook Pro can complete 354 instructions.  

16:24

Here’s the list of all the instructions each  chip can execute and if you take a good look,  

16:30

most of these instructions are rather simple.  Let’s just think about that for a second. Every  

16:37

single thing you do on your computer can be  constructed using only various sequences of 354  

16:45

different instructions. However many programs have  millions upon millions of lines of instructions,  

16:52

and hopefully, there aren’t any bugs in them. So now that we’ve discussed the range of possible  

16:59

instructions, let’s further explore how CPUs  work. In order to complete an instruction there  

17:06

are always three key steps: Fetch, Decode,  and Execute. The first step is Fetch and  
Fetch Decode Execute
--------------------

17:14

is where the controller uses the value in the  program counter to search through the pages of   instructions in the book for the corresponding  instruction address. The controller then  

17:24

copies the instruction found at that address  into a special location called the current  

17:29

instruction register or CIR. At the same time the  controller increases the program counter by 1. 

17:38

The second step is decode, and in this step  the current instruction is fed into a circuit  

17:43

called the instruction decoder. In our analogy  from earlier, this decoder is a key part of the  

17:49

controller, and in essence it’s the circuitry that  reads in an instruction and both interprets what  

17:56

the machine code of an instruction actually does,  and simultaneously produces the control signals to  

18:03

properly execute that instruction. Specifically,  this instruction decoder circuit uses the binary  

18:10

values of the instruction and an incredibly  complex arrangement of logic gates to produce  

18:16

the corresponding control signals which are  then sent to the different elements in the CPU. 

18:22

Instruction decoders are one of the more  complicated parts of the CPU but here’s an  

18:27

example along with a simplified explanation.  Let’s say we have this ADD instruction in the  

18:33

current instruction register or CIR and it’s fed  into the instruction decoder. The first part of  

18:41

the binary instruction specifies we want to use  the ALU. With the ALU selected, the next 3 bits  

18:49

specify that we want to use the ADD function,  and then the last 4 bits of the instruction  

18:55

indicates we want the values in register 0 and  register 1 to be routed and sent to the ALU. 

19:03

Instruction decoding is considerably more  complicated than that but let’s move onto  

19:08

the third step which is Execute. During  execute, using our example instruction,  

19:15

the control signals from the instruction decoder  and an intricate set of electrical timing signals  

19:22

are used to first send the value in register  0 and then the value in register 1 to the ALU.  

19:29

The timing signals are used to accommodate the  time it takes electricity to travel from the  

19:35

registers to the ALU and for transistors and logic  gates to change their state, thereby ensuring the  

19:42

correct result at the output. After the values are  input, the ALU adds the two numbers together, and  

19:49

a subsequent timing signal saves the result into  the accumulator, thus completing the Execute step. 

19:57

These three steps, Fetch, Decode, and Execute are  used to complete a single line of instructions  

20:05

and once it’s completed, these steps repeat but  using the new value in the program counter. In  

20:12

essence Fetch, Decode, and Execute form a cycle  so let’s run through it again. During Fetch,  

20:20

the controller uses the program counter’s value to  fetch the corresponding instruction and places it  

20:26

in the CIR and the program counter increases  by 1. Next during Decode the instruction’s  

20:34

binary is fed into the instruction decoder  where a complex set of logic gates generate  

20:40

the correct electrical control signals for  that instruction. Finally, during Execute,  

20:46

the instruction is completed using the control  signals and timing signals, and in this case,  

20:52

the value in the accumulator is stored back  into a memory address which, using the analogy,  

20:59

is like writing the value from the calculator  display into a data location in the book. Then  

21:05

the Fetch, Decode, Execute cycle repeats again  using the next program counter’s value and so on. 

21:13

The Fetch Decode Execute Cycle is used in every  processor no matter whether it’s the 6502 in  
CPU Clock and Fetch Decode Execute
----------------------------------

21:20

the Apple2e or the M1 in the MacBook Pro. But of  course there are many differences such as the size  

21:28

of the cache, the registers, or functions on the  ALU calculator and much more. We’ll explore the  

21:35

exact differences in a few minutes, but for  now, one important detail is that the Fetch  

21:41

Decode Execute cycle uses your computer’s clock  to regulate its pace. The 6502 chip had a One  

21:49

Megahertz clock which ticked away at a million  times a second and thus each step in the Fetch,  

21:56

Decode, Execute cycle took a microsecond.  Additionally the 6502 was an 8-bit processor  

22:03

meaning the size of the registers and the ALU’s  input and output were 8-bits wide. On the other  

22:10

hand, the M1 chip is a 64-bit processor, so it  can handle much larger numbers and it uses a 3.2  

22:19

Gigahertz clock and therefore each step takes a  third of a nanosecond. Additionally, the M1 chip,  

22:26

along with all modern chips, uses a technique  called pipelining where multiple instructions are  

22:33

queued up resulting in fetch, decode, and execute  for different program counter values and different  

22:40

instructions being completed at the same time. There are many other optimizations in modern  

22:46

processors that we’ll soon discuss  but it’s important to understand   that from the second you turn on your laptop,  smartphone, gaming console, GPU or AI Server,  
Uncovering the Technological DNA: Fetch Decode Execute
------------------------------------------------------

22:57

to the second you shut it off, the processor  is continuously cycling through Fetch, Decode,  

23:04

Execute over and over using programs filled with  instructions and data along with the CPUs clock  

23:12

to regulate its pace. In essence this Fetch,  Decode, Execute cycle is the common section  

23:19

of technological DNA that has powered every  single processor built over the past 50 years. 

23:26

This cycle of steps is incredibly powerful,  capable of performing trillions to quadrillions  

23:33

of mathematical operations every second in  a single chip. But you may be wondering,  

23:40

are there alternatives to the Fetch Decode Execute  cycle? Well, there’s a world of different kinds  
ASICs and FPGAs
---------------

23:47

of microchips, but specifically, alternatives  include Application Specific Integrated Circuits  

23:54

or ASICs such as these microchips found in this  bitcoin mining computer, or Field Programmable  

24:01

Gate Arrays or FPGAs which are the main chips  in a number automotive computers and cameras.  

24:09

Both ASICs and FPGAs don’t use the fetch and  decode steps, but rather they perform repetitive  

24:16

operations by flowing data through a set pattern  of logic gates and execution units, making  

24:22

them highly optimized, but very inflexible. And  then even further from these chips, are Quantum  

24:29

Computers which are based on Qubits and Quantum  circuits which we’ll discuss in future videos. 
Memory and Writeback
--------------------

24:35

But, now that we’ve covered the Fetch, Decode,  Execute cycle, it’s important to discuss two more  

24:41

steps which are Memory and Writeback. Memory is  analogous to moving books from the SSD bookshelves  

24:49

onto the DRAM cart and then onto the table or  Cache Memory, and Writeback is like writing data  

24:56

into the books, and when space for a new book is  needed on the table, the old book is placed back  

25:02

on the DRAM cart and eventually returned to the  bookshelves. These two steps use another special  

25:09

location called the memory address register and  are critical to a functioning computer, but they  

25:15

typically take a lot longer to complete than the  Fetch Decode Execute steps, and therefore in some  

25:21

architectures and textbooks they’re included  in the cycle and sometimes they aren’t. We’re  

25:27

working on a separate video on how data moves  around these memory locations, so stay tuned. 

25:34

Now that we’ve uncovered the technological  DNA inside all processors, it’s important  
Sponsored Section
-----------------

25:40

to note that, similar to the DNA found in the  nucleus of the cell and there being multiple  

25:46

layers of biological organization and structure  for all living things, there are many layers of  

25:52

complexity or abstraction between the Fetch  Decode Execute cycle and a computer running  

25:58

a video game or browsing the internet. If  you want to dive into some of the other  

26:03

layers and understand more about how computers  work, we recommend you check out Brilliant  

26:09

which is the sponsor of this video. Brilliant  has a massive library of interactive courses  

26:15

that include subjects like calculus, scientific  thinking, circuits, programming in python, logic,  

26:23

data analysis, and many more topics that would  take far too long to list. However, Brilliant is  

26:30

much more than a list of courses, rather it’s  as if your favorite teacher who makes classes  

26:36

engaging is combined with your favorite video game  and then mixed with the knowledge from countless  

26:42

textbooks. The result would be Brilliant. Their mission is to create a world of  

26:48

better problem solvers, and every one of their  courses focuses on critical thinking through  

26:54

interactive games and lessons. Furthermore,  with technology progressing faster than ever,  

27:00

Brilliant continuously updates their lessons  to anticipate what you need to know for your  

27:06

education and career. For example, they have a  new course on AI and Large Language Models that  

27:13

explains how Generative AI works far better  than any other textbook or video out there. 

27:19

Develop your knowledge by learning a little every  day. You can start today by signing up for free  

27:25

using the link: Brilliant.org/BranchEducation,  or by scanning the QR code on screen,  

27:33

and you’ll then have access to the wide range of  courses throughout their catalog. If you enjoy  

27:39

their content and decide to stay, the link in the  description below will also save you 20% off an  

27:46

annual premium subscription, which will give you  unlimited daily access to everything on Brilliant. 

27:54

Ok, so let’s quickly run through slightly  more advanced topics to finish up this video.  

28:01

Earlier we mentioned that the MacBook Pro’s M1  chip can complete 354 different instructions.  
RISC vs CISC
------------

28:09

This set of instructions is called ArmV8.4 and  it’s categorized as a RISC architecture or Reduced  

28:17

Instruction Set Computer. For example, here’s a  simple game of Snake using 145 lines of C++ code.  

28:26

It’s the job of a compiler, which is a separate  piece of software, to take this code along with  

28:32

ArmV8.4’s 354 RISC instructions, and generate  a list of 676 assembly instructions equivalent  

28:42

to the machine code instructions that would  be found in a book or program named snake.app 

28:48

The other common architecture found in Intel and  AMD chips is called CISC, or Complex Instruction  

28:55

Set Computer and is composed of thousands of  different possible instructions. For example,  

29:02

here’s the equivalent snake program that  is compiled to run on an Intel or AMD Chip  

29:07

using CISC and x86-64bit instructions, and  you can see it’s only 560 instructions now. 

29:17

A few key differences between RISC and CISC  are that each RISC instruction is relatively  

29:23

simple and is executed at a consistently fast  execution rate. Additionally, RISC architectures  

29:30

are more energy efficient and thus used in  all smartphones, whereas CISC architectures  

29:36

have thousands of different instructions and  pack a lot more into a single instruction.  

29:42

Additionally, the CISC instruction  decoder is much more complicated,   and individual instructions have a variable  execution rate sometimes taking multiple clock  

29:53

cycles to execute. There are many additional  pros and cons to RISC vs CISC which we’ll save  

30:00

for yet another video, but we thought it worth  mentioning these simplified differences here. 

30:07

Computer architecture is incredibly complicated  with many different facets and layers of  
About Branch Education
----------------------

30:13

complexity and we have plans to make more videos  that dive into each of these topics, but it’s  

30:19

important to note that each video we make takes  close to a combined 1100 hours of researching,  

30:26

script writing, modeling, animating and editing.  For example, we spent over 250 hours tearing down  

30:35

these non-working computers we bought from Ebay,  and meticulously rebuilding each of the 3D models  

30:42

in Blender. So, if you could take a few seconds to  like this video, subscribe if you haven’t already,  

30:49

share this video with someone who might be  curious as to how CPUs work, and most importantly,  

30:55

write a quick comment below it would help us out  immensely. Just a few seconds of your time helps  

31:02

us far more than you think. So, thank you. In the final section of this video we’ll  
Extrapolating to the M1
-----------------------

31:09

discuss this diagram we showed earlier and the  architecture of modern processors such as the  

31:15

M1. In contrast, the analogy we’ve laid out  is rather simple, and you’re probably thinking  

31:22

that there must be more components in an actual  CPU. In fact, this analogy is actually pretty  

31:29

close to what’s happening inside an Apple2e  Computer. Specifically, the floppy drives,  

31:35

are the bookshelves, and then when we open up  this computer we see the DRAM chips, which are  

31:40

the cart, and then going inside the 6502 processor  we find an integrated circuit or die which has the  

31:49

corresponding sections that we’ll organize into  an internal architectural diagram. In this diagram  

31:56

you can see the instruction decoder, ALU, the  Program Counter, Current Instruction Register,  

32:03

the other registers and a few other sections.  Specifically, here’s where the program counter  

32:09

is used to fetch an instruction, and here’s where  the instructions and data from the DRAM chips  

32:16

are bussed in and out. Finally, here’s where  the instructions are decoded and the control  

32:23

signals are generated. One note is that there’s  no cache in the 6502 because the DRAM chips in  

32:30

the 80s were just as fast as the instructions,  so the table in the analogy is even smaller. 

32:37

As we said at the beginning of this video,  the 6502 chip is made from 4528 transistors,  

32:46

so let’s see what an M1 chip with 16 billion  transistors would look like. To start,  

32:53

we have to significantly increase the size of  this table. Next, we have to section off areas  

32:59

for each of the performance and energy efficient  cores, the GPU, and other areas. When we focus on  

33:07

one of the performance cores we see the complex  diagram from earlier, so let’s discuss how this  

33:13

diagram compares to our analogy. Specifically,  there’s a separate set of 64 kilobyte data and  

33:21

instruction caches. As mentioned earlier there’s  a pipeline to queue 8 instructions per clock cycle  

33:28

and additional sections like a branch predictor  to reduce issues with conditional branching and  

33:34

help the pipeline run smoothly. Here you can  see the pipelined instruction decoder, and 32  
The Diagram of a Performance Core
---------------------------------

33:40

general purpose registers. One key difference is  that the calculator is broken up into 8 separate  

33:46

smaller calculators each handling a few functions.  Additionally, there’s a special section for load  

33:54

and store instructions. This is the layout of just  a single core out of the 8 and there are entirely  

34:00

different architectures in the Graphics Processing  Unit as well as inside the Neural Processing Unit. 

34:07

One important note is that the inclusion  of these 3 types of processors along with  
CPU vs SoC
----------

34:12

hardware accelerators such as the media  engine makes this M1 chip closer to a  

34:18

system on a chip or SoC than a traditional CPU.  Similarly, all the processors in these devices,  

34:26

including the CPU in your desktop computer can  be considered SoCs and therefore the difference  

34:32

is more a marketing term than a technical one. On a separate note it’s important to mention  

34:38

that the M1 along with all modern processors are  proprietary designs and knowledge, and therefore  

34:44

the diagrams we’ve shown are close approximations  that we built using input from industry experts. 

34:52

Let’s finally discuss our analogy in the terms  of GPU chips found in graphics cards. We have  
GPU Architecture
----------------

34:59

a separate video covering how graphics cards  work, but with respect to this analogy, a GPU  

35:05

CUDA core is actually very similar in complexity  to the architecture of the 6502. Therefore with  

35:13

10,000 to 20,000 CUDA cores in a single GPU chip,  it’s like having a massive array of 6502 cores.  

35:22

The difference is that GPUs typically use  32-bit ALU calculators and perform single  

35:29

instruction multiple thread or SIMT calculations  where a single instruction is fetched, decoded,  

35:36

and then distributed to a batch of cores, and  then those cores execute that instruction using  

35:42

different addresses and data. However, there are  many more nuances to SIMT and GPU architecture,  

35:48

so let’s wrap up this video on how CPUs work. We’re thankful to all our Patreon and YouTube  
Thank You to Our Supporters
---------------------------

35:56

Membership Sponsors for supporting our videos.  If you want to financially support our work,  

36:01

you can find the links in the description below. This is Branch Education, and we create 3D  

36:08

animations that dive deeply into the technology  that drives our modern world. Watch another Branch  

36:14

video by clicking one of these cards or click  here to subscribe. Thanks for watching to the end!


