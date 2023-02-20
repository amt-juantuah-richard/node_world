const checkMillionDollarIdea = (req, res, next) => {
    if (Number(req.item.numWeeks) * Number(req.item.weeklyRevenue) >= 1000000) {
        next();
    } else {
        const err = new Error('Ideas must be worth at least one million dollars');
        next(err);
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
