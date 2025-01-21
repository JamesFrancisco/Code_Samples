import random, numpy, math, copy, matplotlib.pyplot as plt
from mapbox import Directions
from mapbox import Geocoder
cities = [(-111.61471,34.360126), (-111.60927,32.400722), (-111.6341,33.392096), (-111.93462,31.419056), (-111.61271,31.384479)]
tour = random.sample(range(5),5)
for temperature in numpy.logspace(0,5,num=100000)[::-1]:
 	[i,j] = sorted(random.sample(range(5),2))
 	newTour =  tour[:i] + tour[j:j+1] +  tour[i+1:j] + tour[i:i+1] + tour[j+1:]
 	if math.exp( ( sum([ math.sqrt(sum([(cities[tour[(k+1) % 5]][d] - cities[tour[k % 5]][d])**2 for d in [0,1] ])) for k in [j,j-1,i,i-1]]) - sum([math.sqrt(sum([(cities[newTour[(k+1) % 5]][d] - cities[newTour[k % 5]][d])**2 for d in [0,1] ])) for k in [j,j-1,i,i-1]])) / temperature) > random.random():
 		tour = copy.copy(newTour)
homes = cities
print(tour)
for x in tour:
  homes[x] = cities[tour[x]]
print(homes)	
plt.plot(tuple(zip(*[homes[tour[i % 5]] for i in range(6) ]))[0], tuple(zip(*[homes[tour[i % 5]] for i in range(6) ]))[1], 'xb-', )
plt.show()

