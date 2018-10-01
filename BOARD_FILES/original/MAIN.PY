#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Test hepialight2 boards script
'''

__author__ = 'Adrien Lescourt'
__copyright__ = 'hepialight2 hepia 2017'
__credits__ = ['Adrien Lescourt']
__version__ = '1.0.0'
__email__ = 'adrien.lescourt@hesge.ch'
__status__ = 'Prototype'


import time
from Hepialight import touch, screen, accel


def test_screen():
    '''Turn all LEDs on, with red then green then blue

    '''
    colors = [0xFF0000, 0x00FF00, 0x0000FF]
    for color in colors:
        for i in range(10):
            for j in range(10):
                screen.set_led((i, j), color)
        time.sleep(1)


def arrow(coords, arrow_type='LEFT', color=0xFF0000):
    '''Display a minimal arrow at position

    :coords: x, y tuple
    :arrow_type: string, can be ['LEFT', 'RIGHT', 'UP', 'DOWN']
    :color: arrow color

    '''
    if arrow_type.upper() == 'UP':
        for x in range(3):
            screen.set_led((coords[0] + x, coords[1]), color)
        screen.set_led((coords[0] + 1, coords[1] + 1), color)
    if arrow_type.upper() == 'DOWN':
        for x in range(3):
            screen.set_led((coords[0] + x, coords[1] + 1), color)
        screen.set_led((coords[0] + 1, coords[1]), color)
    if arrow_type.upper() == 'LEFT':
        for y in range(3):
            screen.set_led((coords[0] + 1, coords[1] + y), color)
        screen.set_led((coords[0], coords[1] + 1), color)
    if arrow_type.upper() == 'RIGHT':
        for y in range(3):
            screen.set_led((coords[0], coords[1] + y), color)
        screen.set_led((coords[0] + 1, coords[1] + 1), color)


def screen_off():
    '''Shutdown all LEDs

    '''
    for i in range(10):
        for j in range(10):
            screen.set_led((i, j), 0)


def screen_on(color=0xFF0000):
    '''Turn all LEDs on with specified color

    :color: screen color
    '''
    for i in range(10):
        for j in range(10):
            screen.set_led((i, j), color)


def blink_screen(blink_count=5, color=0xFF0000, interval_sec=0.1):
    '''Blink the screen with specified color

    :blink_count: the number of blinks
    :color: color of blinking LEDs

    '''
    for _ in range(blink_count):
        screen_on(color)
        time.sleep(interval_sec)
        screen_off()
        time.sleep(interval_sec)


def test_accel():
    '''Tilt the board in the reds arrows directions until they become green
    '''
    screen_off()
    arrow((1, 3), 'LEFT', 0xFF0000)
    arrow((8, 3), 'RIGHT', 0xFF0000)
    arrow((4, 7), 'UP', 0xFF0000)
    arrow((4, 1), 'DOWN', 0xFF0000)
    threshold = 0.3
    counter_max = 8
    up, down, left, right = 0, 0, 0, 0
    acc = accel()
    while up + down + left + right < 4 * counter_max - 1:
        if acc.get_axis()[0] > threshold:
            left = left + 1 if left < counter_max else counter_max
        if acc.get_axis()[0] < -threshold:
            right = right + 1 if right < counter_max else counter_max
        if acc.get_axis()[1] > threshold:
            up = up + 1 if up < counter_max else counter_max
        if acc.get_axis()[1] < -threshold:
            down = down + 1 if down < counter_max else counter_max
        if left >= counter_max:
            arrow((1, 3), 'LEFT', 0x00FF00)
        if right >= counter_max:
            arrow((8, 3), 'RIGHT', 0x00FF00)
        if up >= counter_max:
            arrow((4, 7), 'UP', 0x00FF00)
        if down >= counter_max:
            arrow((4, 1), 'DOWN', 0x00FF00)
        time.sleep(0.1)
    blink_screen(color=0x00FF00)


def test_touch():
    '''Press the red arrows until all four become green

    '''
    arrow((1, 1), 'UP', 0xFF0000)
    arrow((1, 7), 'UP', 0xFF0000)
    arrow((6, 1), 'UP', 0xFF0000)
    arrow((6, 7), 'UP', 0xFF0000)
    count = [0] * 4
    while sum(count) < 4:
        if touch.read(0):
            arrow((1, 1), 'UP', 0x00FF00)
            count[0] = 1
        if touch.read(1):
            arrow((6, 1), 'UP', 0x00FF00)
            count[1] = 1
        if touch.read(2):
            arrow((1, 7), 'UP', 0x00FF00)
            count[2] = 1
        if touch.read(3):
            arrow((6, 7), 'UP', 0x00FF00)
            count[3] = 1
    blink_screen(color=0x00FF00)


if __name__ == '__main__':
    while True:
        test_screen()
        test_accel()
        test_touch()
