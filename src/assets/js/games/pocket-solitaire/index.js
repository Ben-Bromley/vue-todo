export default class PocketSolitaireGame {
    constructor(pegs, options) {

        // generate gameboard
        [this.pegs, this.holes] = this.generateBoard();
        this.config = { draggingEnabled: true }

        pegs.value = this.pegs
        options.draggingEnabled = this.config.draggingEnabled;
    }

    generateBoard() {
        let pegs = [];
        let holes = [];

        // generate pegs
        for (let i = 1; i < 33; i++) {
            pegs.push({
                id: i,
                // skip center peg
                position: i <= 16 ? i : i + 1
            })
        }

        // generate holes
        for (let j = 1; j <= 33; j++) {
            // add hole IDs
            let newHole = { id: j, }

            // because of the shape of the board, set x coordiantes differently for first/last 2 rows
            if (newHole.id < 7 || newHole.id > 27) {
                // set x coords properly for first/last 2 rows
                newHole.x = newHole.id % 3 === 0 ? 5 : (newHole.id % 3) + 2;
            } else {
                // set x coords for middle 3 rows
                newHole.x = (newHole.id % 7) + 1;
            }

            // set initial y coord
            newHole.y = 1;
            // increase y coord based on row
            if (newHole.id > 3) { newHole.y++; }
            if (newHole.id > 6) { newHole.y++; }
            if (newHole.id > 13) { newHole.y++; }
            if (newHole.id > 20) { newHole.y++; }
            if (newHole.id > 27) { newHole.y++; }
            if (newHole.id > 30) { newHole.y++; }
            if (newHole.id > 33) { newHole.y++; }

            holes.push(newHole);
        }
        return [pegs, holes]
    }

    reset(pegs) {
        // regenerate values
        [this.pegs, this.holes] = this.generateBoard();
        return pegs.value = this.pegs;
    }

    toggleDragging(options) {
        this.config.draggingEnabled = !this.config.draggingEnabled;
        return options.draggingEnabled = this.config.draggingEnabled;
    }

    filterPegsForBoard(holeID, pegs) {
        this.pegs = pegs.value;
        return this.pegs.filter((peg) => {
            return peg.position == holeID;
        })
    }
    getPegByHoleID(holeID) {
        let peg = this.pegs.find((peg) => peg.position == holeID);
        return peg;
    }

    getPegByPegID(pegID) {
        let peg = this.pegs.find((peg) => peg.id == pegID);
        return peg;
    }

    getHoleByPegPosition(pegPos) {
        return this.holes.find((hole) => hole.id == pegPos)
    }

    startDrag(event, peg) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("pegID", peg.id);
    }

    onDrop(event, newHole, pegs) {
        // update local instance to match current game
        this.pegs = pegs.value;
        const pegID = event.dataTransfer.getData("pegID");
        const thisPeg = this.getPegByPegID(pegID);

        // get old hole for coordinate reference
        const oldHole = this.getHoleByPegPosition(thisPeg.position);
        // check there's no pegs in the newHole
        const existingPeg = this.getPegByHoleID(newHole.id);

        // check conditions for moving a peg
        if (
            // only allow movement in 2s (standard gamerule)
            (((oldHole.x + 2 == newHole.x || oldHole.x - 2 == newHole.x) && oldHole.y == newHole.y) ||
                ((oldHole.y + 2 == newHole.y || oldHole.y - 2 == newHole.y) && oldHole.x == newHole.x)) &&
            !existingPeg
        ) {

            // get peg based on hole objects
            let pegToRemove = this.getJumpedPeg(oldHole, newHole);

            // only move peg, if there is another peg to jump over
            if (pegToRemove) {
                // update peg position, move to new hole
                thisPeg.position = newHole.id;

                // remove peg by filtering on id
                this.pegs = this.pegs.filter((peg) => {
                    return peg.id != pegToRemove.id;
                });
            }
        }
        return pegs.value = this.pegs

    }
    getJumpedPeg(oldHole, newHole) {
        // average finds peg between jump, relies on the peg movement rules working
        let jumpedHoleCoords = {
            x: (oldHole.x + newHole.x) / 2,
            y: (oldHole.y + newHole.y) / 2,
        };

        // get hole of peg based on coords
        let holeToRemove = this.holes.find((hole) => {
            return hole.x === jumpedHoleCoords.x && hole.y === jumpedHoleCoords.y;
        });

        // get peg based on hole id
        return this.getPegByHoleID(holeToRemove.id)
    }

    checkAdjacentPegs(checkPeg) {
        let adjacentPegCount = 0;
        let hasAdjacentPegs = false;

        // for a given peg, check all of the pegs
        this.pegs.forEach((tempPeg) => {

            // hole for the current peg in iteration to check
            let tempHole = this.getHoleByPegPosition(tempPeg.position);

            // get the hole for the peg we're checking the neighbours of
            let checkHole = this.getHoleByPegPosition(checkPeg.position);

            // if there's a peg adjacent to another peg, return true
            if (
                (tempHole.y === checkHole.y - 1 && tempHole.x === checkHole.x) ||
                (tempHole.y === checkHole.y + 1 && tempHole.x === checkHole.x) ||
                (tempHole.x === checkHole.x - 1 && tempHole.y === checkHole.y) ||
                (tempHole.x === checkHole.x + 1 && tempHole.y === checkHole.y)
            ) {
                adjacentPegCount++;
                hasAdjacentPegs = true;
            }
        });
        return [hasAdjacentPegs, adjacentPegCount];
    }

    checkGameOver(pegs) {
        this.pegs = pegs.value
        this.gameOver = true;

        this.pegs.forEach((checkPeg) => {
            // check if peg has neighbour pegs
            let [hasAdjacentPegs, adjacentPegCount] = this.checkAdjacentPegs(checkPeg);
            if (hasAdjacentPegs) {
                this.gameOver = false;
            }
        });

        return this.gameOver;
    }

}