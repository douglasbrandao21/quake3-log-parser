function IdentifyKiller(line) {
    const initialIndex = line.lastIndexOf(": ") + 2;
    const finalIndex = line.lastIndexOf(" by ");

    const lineSplited = line
        .slice(initialIndex, finalIndex)
        .split(" killed ");

    const killer = lineSplited[0];
    const killed = lineSplited[1];

    return { killer, killed };
}

module.exports = IdentifyKiller;
