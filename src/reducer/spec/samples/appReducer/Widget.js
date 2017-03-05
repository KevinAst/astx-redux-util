/*
 * Widget provides a number of utilities in support of the widget
 * JSON structure.  In essance it is a pseudo class definition for
 * widget (as close as we can get for a JSON structure).
 */
const Widget = {

  /*
   * Calculate the hash for the supplied widget object.
   *
   * @param {Widget} widget the widget object to hash.
   *
   * @return {string} the hash representing the supplied widget object.
   */
  hash(widget) {

    // YES: I know this is NOT a hash!
    //      HOWEVER:
    //       - this is sample code - that I don't really want more dev dependencies on
    //       - AND it can be systematically validated
    return 'x:' + widget.x + ',y:' + widget.y;
  },

};

export default Widget;
