/**
 * Created by maze on 9/25/16.
 *
 * This interface models a dragon
 * basic traits.
 */

interface Dragon {

    /** The dragon id, mainly used in Web API calls. */
    id: number;

    /** The dragon name. */
    name: string;

    /**
     * The dragon hatching time, not reduced
     * and without days displayed.
     */
    time: string;

    /** The dragon element names. */
    elems: string[];
}

export default Dragon;
