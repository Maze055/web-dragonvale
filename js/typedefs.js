/**
 * @fileoverview
 *
 * This file contains all JSDoc typedefs having no code
 * conterpart.
 */

/**
 * An object representing the basic traits of a
 * dragon: id, name, hatching time and elements.
 *
 * @typedef {object} Dragon
 *
 * @prop {number} id - The id of the dragon.
 * @prop {string} name - The name of the dragon.
 * @prop {string} time - The hatching time of the dragon.
 * @prop {string[]} elems - The elements of the dragon.
 */

/**
 * An object representing a breeding hint: in addition
 * to basic features of a dragon, it holds information
 * about its breeding, such as required parents, types
 * and notes to breed a specific dragon; when none of
 * these is present, basic breeding rule is meant.
 *
 * @typedef {object} Hint
 *
 * @extends Dragon
 *
 * @prop {string[]} [breedElems] - The possible elements required to breed the dragon.
 * @prop {string} [notes] - Potential additional notes about breeding the dragon.
 * @prop {Dragon} [parent1] - Possible parent requested for breeding the dragon.
 * @prop {Dragon} [parent2] - Potential parent necessary to breed the dragon.
 */

/**
 * An object holding a time string in a time proerty.
 *
 * @typedef {object} Time
 *
 * @prop {string} time - The time string held by this object.
 */
