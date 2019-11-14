#!/bin/bash

ansible-playbook -i hosts deploy/mongo.yml
ansible-playbook -i hosts deploy/mongo-express.yml
