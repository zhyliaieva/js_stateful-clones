'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistorie = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete stateCopy[action.keysToRemove[i]];
        }

        break;

      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          if (stateCopy[key]) {
            delete stateCopy[key];
          }
        }

        break;
    }
    stateHistorie.push({ ...stateCopy });
  }

  // Return the history of states
  return stateHistorie;
}

module.exports = transformStateWithClones;
