/**
 * Created by maze on 10/9/16.
 */

import Dragon from '../../shared/models/dragon';

interface BreedingHint extends Dragon {

    /** The elements required to breed the dragon. */
    breedElems?: string[];

    /** Additional notes about breeding the dragon. */
    notes?: string;

    /** Parent requested for breeding the dragon. */
    parent1?: Dragon;

    /** Parent requested for breeding the dragon. */
    parent2?: Dragon;
}

export default BreedingHint;
