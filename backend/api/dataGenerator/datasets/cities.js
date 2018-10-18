const { getRandomInt } = require('../utils/getRandomInt');

const usCities = [
  { place: 'Birmingham, AL, USA', geolocation: { type: 'Point', coordinates: [-86.80249, 33.52066] } },
  { place: 'Huntsville, AL, USA', geolocation: { type: 'Point', coordinates: [-86.5861, 34.73037] } },
  { place: 'Mobile, AL, USA', geolocation: { type: 'Point', coordinates: [-88.04305, 30.69436] } },
  { place: 'Montgomery, AL, USA', geolocation: { type: 'Point', coordinates: [-86.29997, 32.36681] } },
  { place: 'Little Rock, AR, USA', geolocation: { type: 'Point', coordinates: [-92.28959, 34.74648] } },
  { place: 'Washington, D. C., DC, USA', geolocation: { type: 'Point', coordinates: [-77.03637, 38.89511] } },
  { place: 'Brandon, FL, USA', geolocation: { type: 'Point', coordinates: [-82.28592, 27.9378] } },
  { place: 'Cape Coral, FL, USA', geolocation: { type: 'Point', coordinates: [-81.94953, 26.56285] } },
  { place: 'Clearwater, FL, USA', geolocation: { type: 'Point', coordinates: [-82.8001, 27.96585] } },
  { place: 'Coral Springs, FL, USA', geolocation: { type: 'Point', coordinates: [-80.2706, 26.27119] } },
  { place: 'Fort Lauderdale, FL, USA', geolocation: { type: 'Point', coordinates: [-80.14338, 26.12231] } },
  { place: 'Gainesville, FL, USA', geolocation: { type: 'Point', coordinates: [-82.32483, 29.65163] } },
  { place: 'Hialeah, FL, USA', geolocation: { type: 'Point', coordinates: [-80.27811, 25.8576] } },
  { place: 'Hollywood, FL, USA', geolocation: { type: 'Point', coordinates: [-80.14949, 26.0112] } },
  { place: 'Jacksonville, FL, USA', geolocation: { type: 'Point', coordinates: [-81.65565, 30.33218] } },
  { place: 'Miami, FL, USA', geolocation: { type: 'Point', coordinates: [-80.19366, 25.77427] } },
  { place: 'Miami Gardens, FL, USA', geolocation: { type: 'Point', coordinates: [-80.2456, 25.94204] } },
  { place: 'Miramar, FL, USA', geolocation: { type: 'Point', coordinates: [-80.23227, 25.98731] } },
  { place: 'Orlando, FL, USA', geolocation: { type: 'Point', coordinates: [-81.37924, 28.53834] } },
  { place: 'Palm Bay, FL, USA', geolocation: { type: 'Point', coordinates: [-80.58866, 28.03446] } },
  { place: 'Pembroke Pines, FL, USA', geolocation: { type: 'Point', coordinates: [-80.22394, 26.00315] } },
  { place: 'Port Saint Lucie, FL, USA', geolocation: { type: 'Point', coordinates: [-80.35033, 27.29393] } },
  { place: 'Saint Petersburg, FL, USA', geolocation: { type: 'Point', coordinates: [-82.67927, 27.77086] } },
  { place: 'Tallahassee, FL, USA', geolocation: { type: 'Point', coordinates: [-84.28073, 30.43826] } },
  { place: 'Tampa, FL, USA', geolocation: { type: 'Point', coordinates: [-82.45843, 27.94752] } },
  { place: 'Athens, GA, USA', geolocation: { type: 'Point', coordinates: [-83.37794, 33.96095] } },
  { place: 'Atlanta, GA, USA', geolocation: { type: 'Point', coordinates: [-84.38798, 33.749] } },
  { place: 'Columbus, GA, USA', geolocation: { type: 'Point', coordinates: [-84.98771, 32.46098] } },
  { place: 'Savannah, GA, USA', geolocation: { type: 'Point', coordinates: [-81.09983, 32.08354] } },
  { place: 'Springfield, IL, USA', geolocation: { type: 'Point', coordinates: [-89.64371, 39.80172] } },
  { place: 'Evansville, IN, USA', geolocation: { type: 'Point', coordinates: [-87.55585, 37.97476] } },
  { place: 'Indianapolis, IN, USA', geolocation: { type: 'Point', coordinates: [-86.15804, 39.76838] } },
  { place: 'Kansas City, KS, USA', geolocation: { type: 'Point', coordinates: [-94.62746, 39.11417] } },
  { place: 'Olathe, KS, USA', geolocation: { type: 'Point', coordinates: [-94.81913, 38.8814] } },
  { place: 'Overland Park, KS, USA', geolocation: { type: 'Point', coordinates: [-94.67079, 38.98223] } },
  { place: 'Topeka, KS, USA', geolocation: { type: 'Point', coordinates: [-95.67804, 39.04833] } },
  { place: 'Wichita, KS, USA', geolocation: { type: 'Point', coordinates: [-97.33754, 37.69224] } },
  { place: 'Ironville, KY, USA', geolocation: { type: 'Point', coordinates: [-82.69238, 38.45647] } },
  { place: 'Lexington, KY, USA', geolocation: { type: 'Point', coordinates: [-84.47772, 37.98869] } },
  { place: 'Lexington-Fayette, KY, USA', geolocation: { type: 'Point', coordinates: [-84.45855, 38.0498] } },
  { place: 'Louisville, KY, USA', geolocation: { type: 'Point', coordinates: [-85.75941, 38.25424] } },
  { place: 'Meads, KY, USA', geolocation: { type: 'Point', coordinates: [-82.70905, 38.41258] } },
  { place: 'Baton Rouge, LA, USA', geolocation: { type: 'Point', coordinates: [-91.15455, 30.45075] } },
  { place: 'Lafayette, LA, USA', geolocation: { type: 'Point', coordinates: [-92.01984, 30.22409] } },
  { place: 'Metairie, LA, USA', geolocation: { type: 'Point', coordinates: [-90.15285, 29.98409] } },
  { place: 'Metairie Terrace, LA, USA', geolocation: { type: 'Point', coordinates: [-90.16396, 29.97854] } },
  { place: 'New Orleans, LA, USA', geolocation: { type: 'Point', coordinates: [-90.07507, 29.95465] } },
  { place: 'Shreveport, LA, USA', geolocation: { type: 'Point', coordinates: [-93.75018, 32.52515] } },
  { place: 'Baltimore, MD, USA', geolocation: { type: 'Point', coordinates: [-76.61219, 39.29038] } },
  { place: 'Columbia, MO, USA', geolocation: { type: 'Point', coordinates: [-92.33407, 38.95171] } },
  { place: 'East Independence, MO, USA', geolocation: { type: 'Point', coordinates: [-94.35523, 39.09556] } },
  { place: 'Independence, MO, USA', geolocation: { type: 'Point', coordinates: [-94.41551, 39.09112] } },
  { place: 'Kansas City, MO, USA', geolocation: { type: 'Point', coordinates: [-94.57857, 39.09973] } },
  { place: 'St. Louis, MO, USA', geolocation: { type: 'Point', coordinates: [-90.19789, 38.62727] } },
  { place: 'Springfield, MO, USA', geolocation: { type: 'Point', coordinates: [-93.29824, 37.21533] } },
  { place: 'Jackson, MS, USA', geolocation: { type: 'Point', coordinates: [-90.18481, 32.29876] } },
  { place: 'Cary, NC, USA', geolocation: { type: 'Point', coordinates: [-78.78112, 35.79154] } },
  { place: 'Charlotte, NC, USA', geolocation: { type: 'Point', coordinates: [-80.84313, 35.22709] } },
  { place: 'Durham, NC, USA', geolocation: { type: 'Point', coordinates: [-78.89862, 35.99403] } },
  { place: 'Fayetteville, NC, USA', geolocation: { type: 'Point', coordinates: [-78.87836, 35.05266] } },
  { place: 'Greensboro, NC, USA', geolocation: { type: 'Point', coordinates: [-79.79198, 36.07264] } },
  { place: 'High Point, NC, USA', geolocation: { type: 'Point', coordinates: [-80.00532, 35.95569] } },
  { place: 'Raleigh, NC, USA', geolocation: { type: 'Point', coordinates: [-78.63861, 35.7721] } },
  { place: 'West Raleigh, NC, USA', geolocation: { type: 'Point', coordinates: [-78.66389, 35.78682] } },
  { place: 'Wilmington, NC, USA', geolocation: { type: 'Point', coordinates: [-77.94471, 34.22573] } },
  { place: 'Winston-Salem, NC, USA', geolocation: { type: 'Point', coordinates: [-80.24422, 36.09986] } },
  { place: 'Cincinnati, OH, USA', geolocation: { type: 'Point', coordinates: [-84.45689, 39.162] } },
  { place: 'Columbus, OH, USA', geolocation: { type: 'Point', coordinates: [-82.99879, 39.96118] } },
  { place: 'Dayton, OH, USA', geolocation: { type: 'Point', coordinates: [-84.19161, 39.75895] } },
  { place: 'Norman, OK, USA', geolocation: { type: 'Point', coordinates: [-97.43948, 35.22257] } },
  { place: 'Oklahoma City, OK, USA', geolocation: { type: 'Point', coordinates: [-97.51643, 35.46756] } },
  { place: 'Tulsa, OK, USA', geolocation: { type: 'Point', coordinates: [-95.99278, 36.15398] } },
  { place: 'Philadelphia, PA, USA', geolocation: { type: 'Point', coordinates: [-75.16379, 39.95234] } },
  { place: 'Charleston, SC, USA', geolocation: { type: 'Point', coordinates: [-79.93092, 32.77657] } },
  { place: 'Columbia, SC, USA', geolocation: { type: 'Point', coordinates: [-81.03481, 34.00071] } },
  { place: 'Chattanooga, TN, USA', geolocation: { type: 'Point', coordinates: [-85.30968, 35.04563] } },
  { place: 'Clarksville, TN, USA', geolocation: { type: 'Point', coordinates: [-87.35945, 36.52977] } },
  { place: 'East Chattanooga, TN, USA', geolocation: { type: 'Point', coordinates: [-85.24912, 35.06535] } },
  { place: 'Knoxville, TN, USA', geolocation: { type: 'Point', coordinates: [-83.92074, 35.96064] } },
  { place: 'Memphis, TN, USA', geolocation: { type: 'Point', coordinates: [-90.04898, 35.14953] } },
  { place: 'Murfreesboro, TN, USA', geolocation: { type: 'Point', coordinates: [-86.39027, 35.84562] } },
  { place: 'Nashville, TN, USA', geolocation: { type: 'Point', coordinates: [-86.78444, 36.16589] } },
  { place: 'New South Memphis, TN, USA', geolocation: { type: 'Point', coordinates: [-90.05676, 35.08676] } },
  { place: 'Abilene, TX, USA', geolocation: { type: 'Point', coordinates: [-99.73314, 32.44874] } },
  { place: 'Arlington, TX, USA', geolocation: { type: 'Point', coordinates: [-97.10807, 32.73569] } },
  { place: 'Austin, TX, USA', geolocation: { type: 'Point', coordinates: [-97.74306, 30.26715] } },
  { place: 'Beaumont, TX, USA', geolocation: { type: 'Point', coordinates: [-94.10185, 30.08605] } },
  { place: 'Brownsville, TX, USA', geolocation: { type: 'Point', coordinates: [-97.49748, 25.90175] } },
  { place: 'Carrollton, TX, USA', geolocation: { type: 'Point', coordinates: [-96.89028, 32.95373] } },
  { place: 'Corpus Christi, TX, USA', geolocation: { type: 'Point', coordinates: [-97.39638, 27.80058] } },
  { place: 'Dallas, TX, USA', geolocation: { type: 'Point', coordinates: [-96.80667, 32.78306] } },
  { place: 'Denton, TX, USA', geolocation: { type: 'Point', coordinates: [-97.13307, 33.21484] } },
  { place: 'Fort Worth, TX, USA', geolocation: { type: 'Point', coordinates: [-97.32085, 32.72541] } },
  { place: 'Frisco, TX, USA', geolocation: { type: 'Point', coordinates: [-96.82361, 33.15067] } },
  { place: 'Garland, TX, USA', geolocation: { type: 'Point', coordinates: [-96.63888, 32.91262] } },
  { place: 'Grand Prairie, TX, USA', geolocation: { type: 'Point', coordinates: [-96.99778, 32.74596] } },
  { place: 'Houston, TX, USA', geolocation: { type: 'Point', coordinates: [-95.36327, 29.76328] } },
  { place: 'Irving, TX, USA', geolocation: { type: 'Point', coordinates: [-96.94889, 32.81402] } },
  { place: 'Killeen, TX, USA', geolocation: { type: 'Point', coordinates: [-97.7278, 31.11712] } },
  { place: 'Laredo, TX, USA', geolocation: { type: 'Point', coordinates: [-99.50754, 27.50641] } },
  { place: 'McAllen, TX, USA', geolocation: { type: 'Point', coordinates: [-98.23001, 26.20341] } },
  { place: 'McKinney, TX, USA', geolocation: { type: 'Point', coordinates: [-96.61527, 33.19762] } },
  { place: 'Mesquite, TX, USA', geolocation: { type: 'Point', coordinates: [-96.59916, 32.7668] } },
  { place: 'Pasadena, TX, USA', geolocation: { type: 'Point', coordinates: [-95.2091, 29.69106] } },
  { place: 'Plano, TX, USA', geolocation: { type: 'Point', coordinates: [-96.69889, 33.01984] } },
  { place: 'San Antonio, TX, USA', geolocation: { type: 'Point', coordinates: [-98.49363, 29.42412] } },
  { place: 'Waco, TX, USA', geolocation: { type: 'Point', coordinates: [-97.14667, 31.54933] } },
  { place: 'Wichita Falls, TX, USA', geolocation: { type: 'Point', coordinates: [-98.49339, 33.91371] } },
  { place: 'Alexandria, VA, USA', geolocation: { type: 'Point', coordinates: [-77.04692, 38.80484] } },
  { place: 'Arlington, VA, USA', geolocation: { type: 'Point', coordinates: [-77.10428, 38.88101] } },
  { place: 'Chesapeake, VA, USA', geolocation: { type: 'Point', coordinates: [-76.27494, 36.81904] } },
  { place: 'East Hampton, VA, USA', geolocation: { type: 'Point', coordinates: [-76.33161, 37.03737] } },
  { place: 'Hampton, VA, USA', geolocation: { type: 'Point', coordinates: [-76.34522, 37.02987] } },
  { place: 'Newport News, VA, USA', geolocation: { type: 'Point', coordinates: [-76.428, 36.97876] } },
  { place: 'Norfolk, VA, USA', geolocation: { type: 'Point', coordinates: [-76.28522, 36.84681] } },
  { place: 'Richmond, VA, USA', geolocation: { type: 'Point', coordinates: [-77.46026, 37.55376] } },
  { place: 'Virginia Beach, VA, USA', geolocation: { type: 'Point', coordinates: [-75.97798, 36.85293] } },
  { place: 'Hartford, CT, USA', geolocation: { type: 'Point', coordinates: [-72.68509, 41.76371] } },
  { place: 'New Haven, CT, USA', geolocation: { type: 'Point', coordinates: [-72.92816, 41.30815] } },
  { place: 'North Stamford, CT, USA', geolocation: { type: 'Point', coordinates: [-73.54346, 41.13815] } },
  { place: 'Stamford, CT, USA', geolocation: { type: 'Point', coordinates: [-73.53873, 41.05343] } },
  { place: 'Waterbury, CT, USA', geolocation: { type: 'Point', coordinates: [-73.0515, 41.55815] } },
  { place: 'Cedar Rapids, IA, USA', geolocation: { type: 'Point', coordinates: [-91.64407, 42.00833] } },
  { place: 'Des Moines, IA, USA', geolocation: { type: 'Point', coordinates: [-93.60911, 41.60054] } },
  { place: 'Aurora, IL, USA', geolocation: { type: 'Point', coordinates: [-88.32007, 41.76058] } },
  { place: 'Chicago, IL, USA', geolocation: { type: 'Point', coordinates: [-87.65005, 41.85003] } },
  { place: 'Elgin, IL, USA', geolocation: { type: 'Point', coordinates: [-88.28119, 42.03725] } },
  { place: 'Joliet, IL, USA', geolocation: { type: 'Point', coordinates: [-88.08173, 41.52503] } },
  { place: 'Naperville, IL, USA', geolocation: { type: 'Point', coordinates: [-88.14729, 41.78586] } },
  { place: 'North Peoria, IL, USA', geolocation: { type: 'Point', coordinates: [-89.58426, 40.71754] } },
  { place: 'Peoria, IL, USA', geolocation: { type: 'Point', coordinates: [-89.58899, 40.69365] } },
  { place: 'Rockford, IL, USA', geolocation: { type: 'Point', coordinates: [-89.094, 42.27113] } },
  { place: 'Fort Wayne, IN, USA', geolocation: { type: 'Point', coordinates: [-85.12886, 41.1306] } },
  { place: 'South Bend, IN, USA', geolocation: { type: 'Point', coordinates: [-86.25001, 41.68338] } },
  { place: 'Boston, MA, USA', geolocation: { type: 'Point', coordinates: [-71.05977, 42.35843] } },
  { place: 'Cambridge, MA, USA', geolocation: { type: 'Point', coordinates: [-71.10561, 42.3751] } },
  { place: 'Lowell, MA, USA', geolocation: { type: 'Point', coordinates: [-71.31617, 42.63342] } },
  { place: 'South Boston, MA, USA', geolocation: { type: 'Point', coordinates: [-71.04949, 42.33343] } },
  { place: 'Springfield, MA, USA', geolocation: { type: 'Point', coordinates: [-72.58981, 42.10148] } },
  { place: 'Worcester, MA, USA', geolocation: { type: 'Point', coordinates: [-71.80229, 42.26259] } },
  { place: 'Ann Arbor, MI, USA', geolocation: { type: 'Point', coordinates: [-83.74088, 42.27756] } },
  { place: 'Detroit, MI, USA', geolocation: { type: 'Point', coordinates: [-83.04575, 42.33143] } },
  { place: 'Flint, MI, USA', geolocation: { type: 'Point', coordinates: [-83.68746, 43.01253] } },
  { place: 'Grand Rapids, MI, USA', geolocation: { type: 'Point', coordinates: [-85.66809, 42.96336] } },
  { place: 'Lansing, MI, USA', geolocation: { type: 'Point', coordinates: [-84.55553, 42.73254] } },
  { place: 'Sterling Heights, MI, USA', geolocation: { type: 'Point', coordinates: [-83.0302, 42.58031] } },
  { place: 'Warren, MI, USA', geolocation: { type: 'Point', coordinates: [-83.0277, 42.47754] } },
  { place: 'Minneapolis, MN, USA', geolocation: { type: 'Point', coordinates: [-93.26384, 44.97997] } },
  { place: 'Rochester, MN, USA', geolocation: { type: 'Point', coordinates: [-92.4699, 44.02163] } },
  { place: 'Saint Paul, MN, USA', geolocation: { type: 'Point', coordinates: [-93.09327, 44.94441] } },
  { place: 'Fargo, ND, USA', geolocation: { type: 'Point', coordinates: [-96.7898, 46.87719] } },
  { place: 'Lincoln, NE, USA', geolocation: { type: 'Point', coordinates: [-96.66, 40.8] } },
  { place: 'Omaha, NE, USA', geolocation: { type: 'Point', coordinates: [-95.93779, 41.25861] } },
  { place: 'Manchester, NH, USA', geolocation: { type: 'Point', coordinates: [-71.45479, 42.99564] } },
  { place: 'Edison, NJ, USA', geolocation: { type: 'Point', coordinates: [-74.4121, 40.51872] } },
  { place: 'Elizabeth, NJ, USA', geolocation: { type: 'Point', coordinates: [-74.2107, 40.66399] } },
  { place: 'Jersey City, NJ, USA', geolocation: { type: 'Point', coordinates: [-74.07764, 40.72816] } },
  { place: 'Newark, NJ, USA', geolocation: { type: 'Point', coordinates: [-74.17237, 40.73566] } },
  { place: 'Paterson, NJ, USA', geolocation: { type: 'Point', coordinates: [-74.17181, 40.91677] } },
  { place: 'Amherst, NY, USA', geolocation: { type: 'Point', coordinates: [-78.79976, 42.97839] } },
  { place: 'Borough of Bronx, NY, USA', geolocation: { type: 'Point', coordinates: [-73.86641, 40.84985] } },
  { place: 'Brooklyn, NY, USA', geolocation: { type: 'Point', coordinates: [-73.94958, 40.6501] } },
  { place: 'Buffalo, NY, USA', geolocation: { type: 'Point', coordinates: [-78.87837, 42.88645] } },
  { place: 'East New York, NY, USA', geolocation: { type: 'Point', coordinates: [-73.88236, 40.66677] } },
  { place: 'Jamaica, NY, USA', geolocation: { type: 'Point', coordinates: [-73.80569, 40.69149] } },
  { place: 'Manhattan, NY, USA', geolocation: { type: 'Point', coordinates: [-73.96625, 40.78343] } },
  { place: 'New York City, NY, USA', geolocation: { type: 'Point', coordinates: [-74.00597, 40.71427] } },
  { place: 'Borough of Queens, NY, USA', geolocation: { type: 'Point', coordinates: [-73.83652, 40.68149] } },
  { place: 'Rochester, NY, USA', geolocation: { type: 'Point', coordinates: [-77.61556, 43.15478] } },
  { place: 'Staten Island, NY, USA', geolocation: { type: 'Point', coordinates: [-74.13986, 40.56233] } },
  { place: 'Syracuse, NY, USA', geolocation: { type: 'Point', coordinates: [-76.14742, 43.04812] } },
  { place: 'Yonkers, NY, USA', geolocation: { type: 'Point', coordinates: [-73.89875, 40.93121] } },
  { place: 'Akron, OH, USA', geolocation: { type: 'Point', coordinates: [-81.51901, 41.08144] } },
  { place: 'Cleveland, OH, USA', geolocation: { type: 'Point', coordinates: [-81.69541, 41.4995] } },
  { place: 'Toledo, OH, USA', geolocation: { type: 'Point', coordinates: [-83.55521, 41.66394] } },
  { place: 'Allentown, PA, USA', geolocation: { type: 'Point', coordinates: [-75.49018, 40.60843] } },
  { place: 'Erie, PA, USA', geolocation: { type: 'Point', coordinates: [-80.08506, 42.12922] } },
  { place: 'Pittsburgh, PA, USA', geolocation: { type: 'Point', coordinates: [-79.99589, 40.44062] } },
  { place: 'Providence, RI, USA', geolocation: { type: 'Point', coordinates: [-71.41283, 41.82399] } },
  { place: 'Sioux Falls, SD, USA', geolocation: { type: 'Point', coordinates: [-96.70033, 43.54997] } },
  { place: 'Green Bay, WI, USA', geolocation: { type: 'Point', coordinates: [-88.01983, 44.51916] } },
  { place: 'Madison, WI, USA', geolocation: { type: 'Point', coordinates: [-89.40123, 43.07305] } },
  { place: 'Milwaukee, WI, USA', geolocation: { type: 'Point', coordinates: [-87.90647, 43.0389] } },
  { place: 'Bridgeport, CT, USA', geolocation: { type: 'Point', coordinates: [-73.20483, 41.16704] } },
  { place: 'Chandler, AZ, USA', geolocation: { type: 'Point', coordinates: [-111.84125, 33.30616] } },
  { place: 'Gilbert, AZ, USA', geolocation: { type: 'Point', coordinates: [-111.78903, 33.35283] } },
  { place: 'Glendale, AZ, USA', geolocation: { type: 'Point', coordinates: [-112.18599, 33.53865] } },
  { place: 'Mesa, AZ, USA', geolocation: { type: 'Point', coordinates: [-111.82264, 33.42227] } },
  { place: 'Peoria, AZ, USA', geolocation: { type: 'Point', coordinates: [-112.23738, 33.5806] } },
  { place: 'Phoenix, AZ, USA', geolocation: { type: 'Point', coordinates: [-112.07404, 33.44838] } },
  { place: 'Scottsdale, AZ, USA', geolocation: { type: 'Point', coordinates: [-111.89903, 33.50921] } },
  { place: 'Surprise, AZ, USA', geolocation: { type: 'Point', coordinates: [-112.33322, 33.63059] } },
  { place: 'Tempe, AZ, USA', geolocation: { type: 'Point', coordinates: [-111.90931, 33.41477] } },
  { place: 'Tempe Junction, AZ, USA', geolocation: { type: 'Point', coordinates: [-111.94348, 33.41421] } },
  { place: 'Tucson, AZ, USA', geolocation: { type: 'Point', coordinates: [-110.92648, 32.22174] } },
  { place: 'Anaheim, CA, USA', geolocation: { type: 'Point', coordinates: [-117.9145, 33.83529] } },
  { place: 'Antioch, CA, USA', geolocation: { type: 'Point', coordinates: [-121.80579, 38.00492] } },
  { place: 'Bakersfield, CA, USA', geolocation: { type: 'Point', coordinates: [-119.01871, 35.37329] } },
  { place: 'Berkeley, CA, USA', geolocation: { type: 'Point', coordinates: [-122.27275, 37.87159] } },
  { place: 'Burbank, CA, USA', geolocation: { type: 'Point', coordinates: [-118.30897, 34.18084] } },
  { place: 'Carlsbad, CA, USA', geolocation: { type: 'Point', coordinates: [-117.35059, 33.15809] } },
  { place: 'Chula Vista, CA, USA', geolocation: { type: 'Point', coordinates: [-117.0842, 32.64005] } },
  { place: 'Concord, CA, USA', geolocation: { type: 'Point', coordinates: [-122.03107, 37.97798] } },
  { place: 'Corona, CA, USA', geolocation: { type: 'Point', coordinates: [-117.56644, 33.87529] } },
  { place: 'Costa Mesa, CA, USA', geolocation: { type: 'Point', coordinates: [-117.91867, 33.64113] } },
  { place: 'Daly City, CA, USA', geolocation: { type: 'Point', coordinates: [-122.46192, 37.70577] } },
  { place: 'Downey, CA, USA', geolocation: { type: 'Point', coordinates: [-118.13257, 33.94001] } },
  { place: 'East Los Angeles, CA, USA', geolocation: { type: 'Point', coordinates: [-118.17202, 34.0239] } },
  { place: 'El Monte, CA, USA', geolocation: { type: 'Point', coordinates: [-118.02757, 34.06862] } },
  { place: 'Elk Grove, CA, USA', geolocation: { type: 'Point', coordinates: [-121.37162, 38.4088] } },
  { place: 'Escondido, CA, USA', geolocation: { type: 'Point', coordinates: [-117.08642, 33.11921] } },
  { place: 'Fairfield, CA, USA', geolocation: { type: 'Point', coordinates: [-122.03997, 38.24936] } },
  { place: 'Fontana, CA, USA', geolocation: { type: 'Point', coordinates: [-117.43505, 34.09223] } },
  { place: 'Fremont, CA, USA', geolocation: { type: 'Point', coordinates: [-121.98857, 37.54827] } },
  { place: 'Fresno, CA, USA', geolocation: { type: 'Point', coordinates: [-119.77237, 36.74773] } },
  { place: 'Fullerton, CA, USA', geolocation: { type: 'Point', coordinates: [-117.92534, 33.87029] } },
  { place: 'Garden Grove, CA, USA', geolocation: { type: 'Point', coordinates: [-117.94145, 33.77391] } },
  { place: 'Glendale, CA, USA', geolocation: { type: 'Point', coordinates: [-118.25508, 34.14251] } },
  { place: 'Hayward, CA, USA', geolocation: { type: 'Point', coordinates: [-122.0808, 37.66882] } },
  { place: 'Hollywood, CA, USA', geolocation: { type: 'Point', coordinates: [-118.32674, 34.09834] } },
  { place: 'Huntington Beach, CA, USA', geolocation: { type: 'Point', coordinates: [-117.99923, 33.6603] } },
  { place: 'Inglewood, CA, USA', geolocation: { type: 'Point', coordinates: [-118.35313, 33.96168] } },
  { place: 'Irvine, CA, USA', geolocation: { type: 'Point', coordinates: [-117.82311, 33.66946] } },
  { place: 'Lancaster, CA, USA', geolocation: { type: 'Point', coordinates: [-118.13674, 34.69804] } },
  { place: 'Long Beach, CA, USA', geolocation: { type: 'Point', coordinates: [-118.18923, 33.76696] } },
  { place: 'Los Angeles, CA, USA', geolocation: { type: 'Point', coordinates: [-118.24368, 34.05223] } },
  { place: 'Modesto, CA, USA', geolocation: { type: 'Point', coordinates: [-120.99688, 37.6391] } },
  { place: 'Moreno Valley, CA, USA', geolocation: { type: 'Point', coordinates: [-117.23059, 33.93752] } },
  { place: 'Murrieta, CA, USA', geolocation: { type: 'Point', coordinates: [-117.21392, 33.55391] } },
  { place: 'North Glendale, CA, USA', geolocation: { type: 'Point', coordinates: [-118.26452, 34.16056] } },
  { place: 'Norwalk, CA, USA', geolocation: { type: 'Point', coordinates: [-118.08173, 33.90224] } },
  { place: 'Oakland, CA, USA', geolocation: { type: 'Point', coordinates: [-122.2708, 37.80437] } },
  { place: 'Oceanside, CA, USA', geolocation: { type: 'Point', coordinates: [-117.37948, 33.19587] } },
  { place: 'Ontario, CA, USA', geolocation: { type: 'Point', coordinates: [-117.65089, 34.06334] } },
  { place: 'Orange, CA, USA', geolocation: { type: 'Point', coordinates: [-117.85311, 33.78779] } },
  { place: 'Oxnard, CA, USA', geolocation: { type: 'Point', coordinates: [-119.17705, 34.1975] } },
  { place: 'Oxnard Shores, CA, USA', geolocation: { type: 'Point', coordinates: [-119.2415, 34.19084] } },
  { place: 'Palmdale, CA, USA', geolocation: { type: 'Point', coordinates: [-118.11646, 34.57943] } },
  { place: 'Pasadena, CA, USA', geolocation: { type: 'Point', coordinates: [-118.14452, 34.14778] } },
  { place: 'Pomona, CA, USA', geolocation: { type: 'Point', coordinates: [-117.75228, 34.05529] } },
  { place: 'Rancho Cucamonga, CA, USA', geolocation: { type: 'Point', coordinates: [-117.59311, 34.1064] } },
  { place: 'Richmond, CA, USA', geolocation: { type: 'Point', coordinates: [-122.34775, 37.93576] } },
  { place: 'Riverside, CA, USA', geolocation: { type: 'Point', coordinates: [-117.39616, 33.95335] } },
  { place: 'Roseville, CA, USA', geolocation: { type: 'Point', coordinates: [-121.28801, 38.75212] } },
  { place: 'Sacramento, CA, USA', geolocation: { type: 'Point', coordinates: [-121.4944, 38.58157] } },
  { place: 'Salinas, CA, USA', geolocation: { type: 'Point', coordinates: [-121.6555, 36.67774] } },
  { place: 'San Bernardino, CA, USA', geolocation: { type: 'Point', coordinates: [-117.28977, 34.10834] } },
  { place: 'San Diego, CA, USA', geolocation: { type: 'Point', coordinates: [-117.15726, 32.71533] } },
  { place: 'San Francisco, CA, USA', geolocation: { type: 'Point', coordinates: [-122.41942, 37.77493] } },
  { place: 'San Jose, CA, USA', geolocation: { type: 'Point', coordinates: [-121.89496, 37.33939] } },
  { place: 'Santa Ana, CA, USA', geolocation: { type: 'Point', coordinates: [-117.86783, 33.74557] } },
  { place: 'Santa Clara, CA, USA', geolocation: { type: 'Point', coordinates: [-121.95524, 37.35411] } },
  { place: 'Santa Clarita, CA, USA', geolocation: { type: 'Point', coordinates: [-118.54259, 34.39166] } },
  { place: 'Santa Rosa, CA, USA', geolocation: { type: 'Point', coordinates: [-122.71443, 38.44047] } },
  { place: 'Simi Valley, CA, USA', geolocation: { type: 'Point', coordinates: [-118.78148, 34.26945] } },
  { place: 'Stockton, CA, USA', geolocation: { type: 'Point', coordinates: [-121.29078, 37.9577] } },
  { place: 'Sunnyvale, CA, USA', geolocation: { type: 'Point', coordinates: [-122.03635, 37.36883] } },
  { place: 'Temecula, CA, USA', geolocation: { type: 'Point', coordinates: [-117.14836, 33.49364] } },
  { place: 'Thousand Oaks, CA, USA', geolocation: { type: 'Point', coordinates: [-118.83759, 34.17056] } },
  { place: 'Torrance, CA, USA', geolocation: { type: 'Point', coordinates: [-118.34063, 33.83585] } },
  { place: 'Universal City, CA, USA', geolocation: { type: 'Point', coordinates: [-118.35341, 34.1389] } },
  { place: 'Valencia, CA, USA', geolocation: { type: 'Point', coordinates: [-118.60953, 34.44361] } },
  { place: 'Vallejo, CA, USA', geolocation: { type: 'Point', coordinates: [-122.25664, 38.10409] } },
  { place: 'Van Nuys, CA, USA', geolocation: { type: 'Point', coordinates: [-118.44897, 34.18667] } },
  { place: 'Victorville, CA, USA', geolocation: { type: 'Point', coordinates: [-117.29116, 34.53611] } },
  { place: 'Visalia, CA, USA', geolocation: { type: 'Point', coordinates: [-119.29206, 36.33023] } },
  { place: 'West Covina, CA, USA', geolocation: { type: 'Point', coordinates: [-117.93895, 34.06862] } },
  { place: 'Arvada, CO, USA', geolocation: { type: 'Point', coordinates: [-105.08748, 39.80276] } },
  { place: 'Aurora, CO, USA', geolocation: { type: 'Point', coordinates: [-104.83192, 39.72943] } },
  { place: 'Centennial, CO, USA', geolocation: { type: 'Point', coordinates: [-104.87692, 39.57916] } },
  { place: 'Colorado Springs, CO, USA', geolocation: { type: 'Point', coordinates: [-104.82136, 38.83388] } },
  { place: 'Denver, CO, USA', geolocation: { type: 'Point', coordinates: [-104.9847, 39.73915] } },
  { place: 'Lakewood, CO, USA', geolocation: { type: 'Point', coordinates: [-105.08137, 39.70471] } },
  { place: 'Pueblo, CO, USA', geolocation: { type: 'Point', coordinates: [-104.60914, 38.25445] } },
  { place: 'Thornton, CO, USA', geolocation: { type: 'Point', coordinates: [-104.97192, 39.86804] } },
  { place: 'Westminster, CO, USA', geolocation: { type: 'Point', coordinates: [-105.0372, 39.83665] } },
  { place: 'Albuquerque, NM, USA', geolocation: { type: 'Point', coordinates: [-106.65114, 35.08449] } },
  { place: 'Enterprise, NV, USA', geolocation: { type: 'Point', coordinates: [-115.24194, 36.02525] } },
  { place: 'Henderson, NV, USA', geolocation: { type: 'Point', coordinates: [-114.98194, 36.0397] } },
  { place: 'Las Vegas, NV, USA', geolocation: { type: 'Point', coordinates: [-115.13722, 36.17497] } },
  { place: 'North Las Vegas, NV, USA', geolocation: { type: 'Point', coordinates: [-115.1175, 36.19886] } },
  { place: 'Paradise, NV, USA', geolocation: { type: 'Point', coordinates: [-115.14666, 36.09719] } },
  { place: 'Reno, NV, USA', geolocation: { type: 'Point', coordinates: [-119.8138, 39.52963] } },
  { place: 'Spring Valley, NV, USA', geolocation: { type: 'Point', coordinates: [-115.245, 36.10803] } },
  { place: 'Sunrise Manor, NV, USA', geolocation: { type: 'Point', coordinates: [-115.07306, 36.21108] } },
  { place: 'Amarillo, TX, USA', geolocation: { type: 'Point', coordinates: [-101.8313, 35.222] } },
  { place: 'El Paso, TX, USA', geolocation: { type: 'Point', coordinates: [-106.48693, 31.75872] } },
  { place: 'Lubbock, TX, USA', geolocation: { type: 'Point', coordinates: [-101.85517, 33.57786] } },
  { place: 'Midland, TX, USA', geolocation: { type: 'Point', coordinates: [-102.07791, 31.99735] } },
  { place: 'Fort Collins, CO, USA', geolocation: { type: 'Point', coordinates: [-105.08442, 40.58526] } },
  { place: 'Boise, ID, USA', geolocation: { type: 'Point', coordinates: [-116.20345, 43.6135] } },
  { place: 'Billings, MT, USA', geolocation: { type: 'Point', coordinates: [-108.50069, 45.78329] } },
  { place: 'Eugene, OR, USA', geolocation: { type: 'Point', coordinates: [-123.08675, 44.05207] } },
  { place: 'Gresham, OR, USA', geolocation: { type: 'Point', coordinates: [-122.43148, 45.49818] } },
  { place: 'Portland, OR, USA', geolocation: { type: 'Point', coordinates: [-122.67621, 45.52345] } },
  { place: 'Salem, OR, USA', geolocation: { type: 'Point', coordinates: [-123.0351, 44.9429] } },
  { place: 'Provo, UT, USA', geolocation: { type: 'Point', coordinates: [-111.65853, 40.23384] } },
  { place: 'Salt Lake City, UT, USA', geolocation: { type: 'Point', coordinates: [-111.89105, 40.76078] } },
  { place: 'West Jordan, UT, USA', geolocation: { type: 'Point', coordinates: [-111.9391, 40.60967] } },
  { place: 'West Valley City, UT, USA', geolocation: { type: 'Point', coordinates: [-112.00105, 40.69161] } },
  { place: 'Bellevue, WA, USA', geolocation: { type: 'Point', coordinates: [-122.20068, 47.61038] } },
  { place: 'Everett, WA, USA', geolocation: { type: 'Point', coordinates: [-122.20208, 47.97898] } },
  { place: 'Seattle, WA, USA', geolocation: { type: 'Point', coordinates: [-122.33207, 47.60621] } },
  { place: 'Spokane, WA, USA', geolocation: { type: 'Point', coordinates: [-117.42908, 47.65966] } },
  { place: 'Tacoma, WA, USA', geolocation: { type: 'Point', coordinates: [-122.44429, 47.25288] } },
  { place: 'Vancouver, WA, USA', geolocation: { type: 'Point', coordinates: [-122.66149, 45.63873] } },
  { place: 'Honolulu, HI, USA', geolocation: { type: 'Point', coordinates: [-157.85833, 21.30694] } },
  { place: 'Anchorage, AK, USA', geolocation: { type: 'Point', coordinates: [-149.90028, 61.21806] } },
];

const getCity = (blank) => {
  const rand = Math.random();

  return blank && (rand >= 0 && rand < blank / 100)
    ? null
    : usCities[getRandomInt(0, usCities.length - 1)];
};

const getCities = (maxCities, blank) => {
  const rand = Math.random();
  const numCities = blank && (rand >= 0 && rand < blank / 100) ? [] : getRandomInt(1, maxCities);
  const cities = [];

  for (let i = 0; i < numCities; i += 1) {
    cities.push(usCities[getRandomInt(0, usCities.length - 1)]);
  }

  return cities;
};

module.exports = {
  getCity,
  getCities,
};
