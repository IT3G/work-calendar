#!/bin/bash

ansible-playbook -i hosts playbooks/mongo.yml
ansible-playbook -i hosts playbooks/mongo-express.yml
ansible-playbook -i hosts playbooks/deploy-frontend-simple.yml
ansible-playbook -i hosts playbooks/deploy-backend-simple.yml
