---
date: "Fri Nov 16 2012 21:25:00 GMT+0000 (Greenwich Mean Time)"
title: "Electric vehicles: calculations for Tesla Model S"
description: ""
category: "science-technology-nature"
---
To get a firmer grasp of the physics involved I did some test cases (as seen before) but I just copied that analysis and applied it to the new Tesla Model S (basic model). I calculate the power required for 0-60mph then compare with their published result, and then I calculate the energy consumption and the range you would get given the published stats. My findings are consistent with the published material from Tesla which gives me confidence in my ability; however, I ignored [rolling resistance](http://www.diyelectriccar.com/forums/showthread.php?t=6646) for simplicity and arrived at a similar answer to the published results. I've taken fairly simplistic approach which gets close to the real answers but it isn't the most thorough method.

I haven't worked through drive chain efficiencies either, again for simplicity. This has been cross posted to the [DIY EV forums](http://www.diyelectriccar.com/forums/showthread.php/hello-scotland-80747p7.html "DIY EV").  
  
  
0 - 100 km/h (62.5 mph = 28 m/s) power calculation  
\------------  
  
Power = Force \* Distance/time (= F x speed) (magnitude of force, as speed and power are not vectors)  
Under a constant 1G acceleration (9.8 m/sec/sec) then the time taken would be 2.8 seconds.  
Force = mass \* accel (obviously ignoring vector considerations due to the symmetry of the problem)  
  
Mass = 4647.3 lbs = 2112 kg (I divided the lbs value by 2.2 and rounded to nearest whole number for this thread)  
source: [Tesla](http://www.teslamotors.com/models/specs "Tesla Model S")  
  
  
The base model has a 40kWh battery with a published 0-60mph time of 6.5s with a motor that has a power rating of 270kW.  
I used 28 m/s^2 but kept 6.5s to calculate power. I can show that their numbers appear consistent:  
  
Power (kW) = mass x accel x speed /1000 = 2112 x 9.8 x (2.8/6.5) x 28 /1000 = 249.7 kW  
  
I divided by 1000 to get kW, the 2.8/6.5 is just a simple time scaling factor to prevent modifying my existing spreadsheet too much.  
  
  
  
Energy consumption / range  
\------------  
Here I will assume a constant speed with no acceleration. For simplicity I have ignored [rolling resistance](http://www.diyelectriccar.com/forums/showthread.php?t=6646) and worked solely with the drag force.  
  
Drag Force: Fd = 1/2 \* Rho \* Cd \* A \* V^2  
  
area calculation:  
width = 77.3 inches = 1.96342 m  
height = 56.5 inches = 1.4351 m  
area = 2.8 m^2 (rounded)  
  
  
Rho = 1.293 kg/m3 (at 0 °C and 1 atmosphere -- [Wikipedia Drag Force](http://en.wikipedia.org/wiki/Drag_\(physics\)))  
Cd = 0.24 ([Wikipedia Tesla Model S](http://en.wikipedia.org/wiki/Tesla_Model_S))  
Area = 2.8 m^2  
V = 24.5 m/s (= 55.125 mph, speed not velocity)  
Force = 524.85 Nm  
  
Power (kW) = force \* speed / 1000 = 12.85 kW  
  
Consumption:  
Assume a duration of 1 hour  
Distance = speed \* duration (mph x hours) = 55.125 miles  
Energy consumption: 233 Wh / miles  
  
If the base car does 160 miles (published range figured) then it requires 160 \* 233 Watt hours = 37280 Wh.  
The battery in the base car is rated as 40 kWh, which is pretty close to my figure of 37 kWh.  
  
  
Any feedback is appreciated.

Update (18/11/2012):

After some discussion on the DIY forums I should add a caveat:

"Solving the equation for power using mass, acceleration and speed merely gives you the power at that speed under that particular condition of acceleration and ignores any external forces. Such a point in time calculation may or may not relate to the motor's power rating."