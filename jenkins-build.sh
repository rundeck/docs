#!/bin/bash

# script for jenkins

make clean
make
make -C pro clean
make -C pro
