import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw


CIRCLE_RADIUS = 5


location_names = {}

f=open('LocationMarker.csv')
for line in f:
    line = line.strip()
    internal_name, name = line.split(',')
    name = name.strip('"')
    location_names[internal_name] = name
f.close()


botw_map = Image.open("BotW-Map.png")
map_draw = ImageDraw.Draw(botw_map)


root = ET.parse('Static.xml').getroot()

for child in list(root[1]) + list(root[2]):
    messageID = '{{NoName}}'
    for subchild in child:
        if subchild.tag == 'MessageID':
            messageID = subchild.text
        if subchild.tag == 'Translate':
            x,_,z = float(subchild.attrib['X'].rstrip('f')), float(subchild.attrib['Y'].rstrip('f')), float(subchild.attrib['Z'].rstrip('f'))
    if messageID == '{{NoName}}':
        for subchild in child:
            if subchild.tag == 'Icon':
                messageID = subchild.text + '}'
            if subchild.tag == 'SaveFlag':
                messageID = '{' + subchild.text + ':' + messageID
    if messageID in location_names:
        name = location_names[messageID]
    else:
        name = messageID

    if messageID.startswith('Dungeon'):
        continue # ignore the 120 shrines

    img_x = int(3000 + x // 2)
    img_y = int(2500 + z // 2)
    print(messageID, img_x, img_y, name)

    map_draw.ellipse((img_x-CIRCLE_RADIUS, img_y-CIRCLE_RADIUS, img_x+CIRCLE_RADIUS, img_y+CIRCLE_RADIUS), fill='cyan', outline='red')

    

botw_map.save('BotW-Map-Labeled.png')

# X ranges from -4870.5 to 4736.618, Z ranges from -3802.419 to 3840.943
# LocationMarker len 215, LocationPointer len 131, total len 346 (120 shrines, 226 other)
