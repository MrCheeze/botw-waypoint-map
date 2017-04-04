import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw


CIRCLE_RADIUS = 7


location_names = {}

f=open('LocationMarker.csv')
for line in f:
    line = line.strip()
    internal_name, name = line.split(',')
    name = name.strip('"')
    location_names[internal_name] = name
f.close()

static_values = ET.parse('Static.xml').getroot().findall('./*/value/SaveFlag/..')

botw_map = Image.open("BotW-Map.png")
map_draw = ImageDraw.Draw(botw_map)

f=open('tracked_locations.txt')
f2=open('map_locations.js','w')
f2.write('var locations = [\n')
for line in f:
    location = line.strip()
    found = False
    name = None
    if location in location_names:
        name = location_names[location]
    for value in static_values:
        saveflag = value.findall('./SaveFlag')[0].text
        
        if 'Location_' + location == saveflag:
            messageIDs = value.findall('./MessageID')
            if not name and len(messageIDs) and (messageIDs[0].text in location_names):
                name = location_names[messageIDs[0].text]
            if not name:
                name = location
            
            translate = value.findall('./Translate')[0]
            x,z = float(translate.attrib['X'].rstrip('f')), float(translate.attrib['Z'].rstrip('f'))
            f2.write('{"internal_name":"%s", "display_name":"%s", "x":%g, "y":%g},\n' % (saveflag, name, x, z))

            img_x = int(x/2 + 3000)
            img_y = int(z/2 + 2500)
            map_draw.ellipse((img_x-CIRCLE_RADIUS, img_y-CIRCLE_RADIUS, img_x+CIRCLE_RADIUS, img_y+CIRCLE_RADIUS), fill='cyan', outline='blue')

            found = True
            break
    if not found:
        print('Not found %s (%s)' % (location, name))

f2.write('];\n')
f.close()
f2.close()
botw_map.save('BotW-Map-Labeled.png')
