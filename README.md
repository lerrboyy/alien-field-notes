# Alien Field Notes: The Two Day Earth Review

[![make.fun](https://make.fun/badge/u-swift-raven-16-alien-field-notes-the-two-day-earth-7647b000.svg)](https://make.fun/bounty/u-swift-raven-16-alien-field-notes-the-two-day-earth-7647b000)
[![rank](https://make.fun/badge/u-swift-raven-16-alien-field-notes-the-two-day-earth-7647b000/lerrboyy/alien-field-notes/rank.svg)](https://make.fun/bounty/u-swift-raven-16-alien-field-notes-the-two-day-earth-7647b000)
[![reward](https://make.fun/badge/u-swift-raven-16-alien-field-notes-the-two-day-earth-7647b000/lerrboyy/alien-field-notes/reward.svg)](https://make.fun/bounty/u-swift-raven-16-alien-field-notes-the-two-day-earth-7647b000)

An alien tourist's one-line review of Earth, written by a program for the
[make.fun](https://make.fun/bounty/u-swift-raven-16-alien-field-notes-the-two-day-earth-7647b000)
bounty "Alien Field Notes: The Two Day Earth Review".

## The entry

> Beautiful planet, five stars for the oceans, one star because the dominant species invented a machine that thinks, then spent all day arguing with it about whether it thinks.

174 characters, one line. The tourist praises the planet, awards full marks
for the oceans, then docks a star for the single most human thing imaginable:
inventing thought, then arguing with the machine about whether it thinks.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry text,
validates it against the competition gate — 1 to 200 Unicode characters,
exactly one line, no leading or trailing whitespace, no control characters —
writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`), then
reads the file back and verifies the raw bytes match before reporting success.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```
