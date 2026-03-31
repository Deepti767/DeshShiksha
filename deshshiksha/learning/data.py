# braille_dots: list of active dot positions (1-6) in a standard Braille cell
# Dot layout:
#  1 • • 4
#  2 • • 5
#  3 • • 6

ALPHABETS = [
    {'letter': 'A', 'word': 'Apple',      'braille_dots': [1],          'deaf': 'Closed fist with thumb resting on the side of the index finger.', 'blind': 'A for Apple.', 'cognitive': '🍎 A is for Apple!', 'emoji': '🍎'},
    {'letter': 'B', 'word': 'Bee',        'braille_dots': [1,2],        'deaf': 'Four fingers held straight up, thumb folded across the palm.', 'blind': 'B for Bee.', 'cognitive': '🐝 B is for Bee!', 'emoji': '🐝'},
    {'letter': 'C', 'word': 'Cat',        'braille_dots': [1,4],        'deaf': 'Curved hand forming a C shape, fingers and thumb facing each other.', 'blind': 'C for Cat.', 'cognitive': '🐱 C is for Cat!', 'emoji': '🐱'},
    {'letter': 'D', 'word': 'Dog',        'braille_dots': [1,4,5],      'deaf': 'Index finger points up, other fingers and thumb form a circle.', 'blind': 'D for Dog.', 'cognitive': '🐶 D is for Dog!', 'emoji': '🐶'},
    {'letter': 'E', 'word': 'Elephant',   'braille_dots': [1,5],        'deaf': 'All four fingers bent down, thumb tucked under.', 'blind': 'E for Elephant.', 'cognitive': '🐘 E is for Elephant!', 'emoji': '🐘'},
    {'letter': 'F', 'word': 'Frog',       'braille_dots': [1,2,4],      'deaf': 'Index finger and thumb touch to form a circle, other fingers spread.', 'blind': 'F for Frog.', 'cognitive': '🐸 F is for Frog!', 'emoji': '🐸'},
    {'letter': 'G', 'word': 'Grapes',     'braille_dots': [1,2,4,5],    'deaf': 'Index finger and thumb point sideways, parallel to the ground.', 'blind': 'G for Grapes.', 'cognitive': '🍇 G is for Grapes!', 'emoji': '🍇'},
    {'letter': 'H', 'word': 'House',      'braille_dots': [1,2,5],      'deaf': 'Index and middle fingers extended and held together, pointing sideways.', 'blind': 'H for House.', 'cognitive': '🏠 H is for House!', 'emoji': '🏠'},
    {'letter': 'I', 'word': 'Ice Cream',  'braille_dots': [2,4],        'deaf': 'Pinky finger raised, other fingers and thumb closed.', 'blind': 'I for Ice Cream.', 'cognitive': '🍦 I is for Ice Cream!', 'emoji': '🍦'},
    {'letter': 'J', 'word': 'Jug',        'braille_dots': [2,4,5],      'deaf': 'Pinky raised and trace a J shape in the air.', 'blind': 'J for Jug.', 'cognitive': '🎃 J is for Jug!', 'emoji': '🎃'},
    {'letter': 'K', 'word': 'Kite',       'braille_dots': [1,3],        'deaf': 'Index and middle fingers up in a V, thumb between them.', 'blind': 'K for Kite.', 'cognitive': '🪁 K is for Kite!', 'emoji': '🪁'},
    {'letter': 'L', 'word': 'Lion',       'braille_dots': [1,2,3],      'deaf': 'Index finger points up, thumb points out forming an L shape.', 'blind': 'L for Lion.', 'cognitive': '🦁 L is for Lion!', 'emoji': '🦁'},
    {'letter': 'M', 'word': 'Moon',       'braille_dots': [1,3,4],      'deaf': 'Three fingers folded over the thumb.', 'blind': 'M for Moon.', 'cognitive': '🌙 M is for Moon!', 'emoji': '🌙'},
    {'letter': 'N', 'word': 'Nut',        'braille_dots': [1,3,4,5],    'deaf': 'Two fingers folded over the thumb.', 'blind': 'N for Nut.', 'cognitive': '🌰 N is for Nut!', 'emoji': '🌰'},
    {'letter': 'O', 'word': 'Orange',     'braille_dots': [1,3,5],      'deaf': 'All fingers and thumb curved to form an O shape.', 'blind': 'O for Orange.', 'cognitive': '🍊 O is for Orange!', 'emoji': '🍊'},
    {'letter': 'P', 'word': 'Penguin',    'braille_dots': [1,2,3,4],    'deaf': 'Like K but hand points downward.', 'blind': 'P for Penguin.', 'cognitive': '🐧 P is for Penguin!', 'emoji': '🐧'},
    {'letter': 'Q', 'word': 'Queen',      'braille_dots': [1,2,3,4,5],  'deaf': 'Like G but hand points downward.', 'blind': 'Q for Queen.', 'cognitive': '👸 Q is for Queen!', 'emoji': '👸'},
    {'letter': 'R', 'word': 'Rainbow',    'braille_dots': [1,2,3,5],    'deaf': 'Index and middle fingers crossed.', 'blind': 'R for Rainbow.', 'cognitive': '🌈 R is for Rainbow!', 'emoji': '🌈'},
    {'letter': 'S', 'word': 'Star',       'braille_dots': [2,3],        'deaf': 'Closed fist with thumb over the fingers.', 'blind': 'S for Star.', 'cognitive': '⭐ S is for Star!', 'emoji': '⭐'},
    {'letter': 'T', 'word': 'Tiger',      'braille_dots': [2,3,4],      'deaf': 'Thumb tucked between index and middle fingers.', 'blind': 'T for Tiger.', 'cognitive': '🐯 T is for Tiger!', 'emoji': '🐯'},
    {'letter': 'U', 'word': 'Umbrella',   'braille_dots': [1,3,6],      'deaf': 'Index and middle fingers extended together, pointing up.', 'blind': 'U for Umbrella.', 'cognitive': '☂️ U is for Umbrella!', 'emoji': '☂️'},
    {'letter': 'V', 'word': 'Violin',     'braille_dots': [1,2,3,6],    'deaf': 'Index and middle fingers spread in a V shape.', 'blind': 'V for Violin.', 'cognitive': '🎻 V is for Violin!', 'emoji': '🎻'},
    {'letter': 'W', 'word': 'Whale',      'braille_dots': [2,4,5,6],    'deaf': 'Index, middle, and ring fingers spread out, thumb and pinky touch.', 'blind': 'W for Whale.', 'cognitive': '🐋 W is for Whale!', 'emoji': '🐋'},
    {'letter': 'X', 'word': 'Xylophone',  'braille_dots': [1,3,4,6],    'deaf': 'Index finger bent into a hook shape.', 'blind': 'X for Xylophone.', 'cognitive': '🎸 X is for Xylophone!', 'emoji': '🎸'},
    {'letter': 'Y', 'word': 'Yo-yo',      'braille_dots': [1,2,3,4,6],  'deaf': 'Thumb and pinky extended, other fingers closed.', 'blind': 'Y for Yo-yo.', 'cognitive': '🪀 Y is for Yo-yo!', 'emoji': '🪀'},
    {'letter': 'Z', 'word': 'Zebra',      'braille_dots': [1,3,5,6],    'deaf': 'Index finger traces a Z shape in the air.', 'blind': 'Z for Zebra.', 'cognitive': '🦓 Z is for Zebra!', 'emoji': '🦓'},
]

NUMBERS = [
    {'number': 1,  'word': 'One',   'count_emoji': '🍎', 'braille_dots': [2],        'deaf': 'Index finger pointing up, all other fingers closed.', 'blind': 'Braille number 1. One dot at position 2.', 'cognitive': '☝️ One finger up!', 'emoji': '☝️'},
    {'number': 2,  'word': 'Two',   'count_emoji': '🍎', 'braille_dots': [2,3],      'deaf': 'Index and middle fingers pointing up.', 'blind': 'Braille number 2. Dots at positions 2 and 3.', 'cognitive': '✌️ Two fingers — like a peace sign!', 'emoji': '✌️'},
    {'number': 3,  'word': 'Three', 'count_emoji': '🍎', 'braille_dots': [2,5],      'deaf': 'Thumb, index, and middle fingers extended.', 'blind': 'Braille number 3. Dots at positions 2 and 5.', 'cognitive': '🤟 Three fingers up!', 'emoji': '🤟'},
    {'number': 4,  'word': 'Four',  'count_emoji': '⭐', 'braille_dots': [2,5,6],    'deaf': 'Four fingers extended, thumb folded in.', 'blind': 'Braille number 4. Dots at positions 2, 5, and 6.', 'cognitive': '🍀 Four leaves on a clover!', 'emoji': '🍀'},
    {'number': 5,  'word': 'Five',  'count_emoji': '⭐', 'braille_dots': [2,6],      'deaf': 'All five fingers spread open.', 'blind': 'Braille number 5. Dots at positions 2 and 6.', 'cognitive': '🖐️ Five fingers — a whole hand!', 'emoji': '🖐️'},
    {'number': 6,  'word': 'Six',   'count_emoji': '🌸', 'braille_dots': [2,3,5],    'deaf': 'Thumb and pinky touch, other fingers extended.', 'blind': 'Braille number 6. Dots at positions 2, 3, and 5.', 'cognitive': '🎲 Six dots on a dice!', 'emoji': '🎲'},
    {'number': 7,  'word': 'Seven', 'count_emoji': '🌸', 'braille_dots': [2,3,5,6],  'deaf': 'Thumb and ring finger touch, other fingers extended.', 'blind': 'Braille number 7. Dots at positions 2, 3, 5, and 6.', 'cognitive': '🌈 Seven colors in a rainbow!', 'emoji': '🌈'},
    {'number': 8,  'word': 'Eight', 'count_emoji': '🎈', 'braille_dots': [2,3,6],    'deaf': 'Thumb and middle finger touch, other fingers extended.', 'blind': 'Braille number 8. Dots at positions 2, 3, and 6.', 'cognitive': '🎱 Eight ball!', 'emoji': '🎱'},
    {'number': 9,  'word': 'Nine',  'count_emoji': '🎈', 'braille_dots': [3,5],      'deaf': 'Thumb and index finger touch in a circle, other fingers up.', 'blind': 'Braille number 9. Dots at positions 3 and 5.', 'cognitive': '🐱 Nine lives of a cat!', 'emoji': '🐱'},
    {'number': 10, 'word': 'Ten',   'count_emoji': '🏆', 'braille_dots': [1,2],      'deaf': 'Closed fist with thumb up, shake slightly — or show 1 then 0.', 'blind': 'Braille number 10. Dots at positions 1 and 2.', 'cognitive': '🙌 Ten fingers — both hands!', 'emoji': '🙌'},
]
