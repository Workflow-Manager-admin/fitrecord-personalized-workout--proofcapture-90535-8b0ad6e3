#!/bin/bash
cd /home/kavia/workspace/code-generation/fitrecord-personalized-workout--proofcapture-90535-8b0ad6e3/fitness_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

