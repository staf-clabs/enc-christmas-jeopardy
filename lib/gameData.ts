export type RawGameData = {
  title: string;
  rounds: Array<{
    name: string;
    dollars: number[];
    categories: Array<{
      name: string;
      clues: Array<{ value: number; clue: string; answer: string; ref: string }>;
    }>;
  }>;
  final: { category: string; clue: string; answer: string; ref: string };
};

export const gameData: RawGameData = {
  "title": "ENC NYC • Christmas Bible Jeopardy",
  "rounds": [
    {
      "name": "Round 1",
      "dollars": [
        100,
        200,
        300,
        400,
        500
      ],
      "categories": [
        {
          "name": "Nativity Narratives",
          "clues": [
            {
              "value": 100,
              "clue": "Gabriel appears in this town of Galilee to tell Mary she will bear the Son of the Most High.",
              "answer": "What is Nazareth?",
              "ref": "Luke 1:26–38"
            },
            {
              "value": 200,
              "clue": "In a dream, Joseph is told to name the child this, meaning “The LORD saves.”",
              "answer": "What is Jesus?",
              "ref": "Matthew 1:20–21"
            },
            {
              "value": 300,
              "clue": "Because of a decree from this Roman emperor, Joseph and Mary traveled to Bethlehem.",
              "answer": "Who is Caesar Augustus?",
              "ref": "Luke 2:1–5"
            },
            {
              "value": 400,
              "clue": "The angels told the shepherds they would find the baby wrapped in these and lying in a manger.",
              "answer": "What are swaddling cloths?",
              "ref": "Luke 2:12"
            },
            {
              "value": 500,
              "clue": "According to Matthew, the Magi brought these three gifts to the young Jesus.",
              "answer": "What are gold, frankincense, and myrrh?",
              "ref": "Matthew 2:11"
            }
          ]
        },
        {
          "name": "Prophecies & Promises",
          "clues": [
            {
              "value": 100,
              "clue": "“Behold, the virgin shall conceive and bear a son…”—this prophet wrote it first.",
              "answer": "Who is Isaiah?",
              "ref": "Isaiah 7:14"
            },
            {
              "value": 200,
              "clue": "This prophet foretold the Messiah would come from Bethlehem Ephrathah.",
              "answer": "Who is Micah?",
              "ref": "Micah 5:2"
            },
            {
              "value": 300,
              "clue": "Matthew ties Jesus’ return to fulfill “Out of Egypt I called my son” — from this OT book.",
              "answer": "What is Hosea?",
              "ref": "Hosea 11:1; Matthew 2:15"
            },
            {
              "value": 400,
              "clue": "Jeremiah’s “Rachel weeping” is linked by Matthew to this tragedy ordered by Herod.",
              "answer": "What is the slaughter of the infants in Bethlehem?",
              "ref": "Jeremiah 31:15; Matthew 2:16–18"
            },
            {
              "value": 500,
              "clue": "These four titles appear together in Isaiah’s prophecy about a child who will be born.",
              "answer": "What are Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace?",
              "ref": "Isaiah 9:6"
            }
          ]
        },
        {
          "name": "Angels & Announcements",
          "clues": [
            {
              "value": 100,
              "clue": "This angel announced the birth of John the Baptist to Zechariah.",
              "answer": "Who is Gabriel?",
              "ref": "Luke 1:11–19"
            },
            {
              "value": 200,
              "clue": "This priest was struck mute until the day his son was named.",
              "answer": "Who is Zechariah?",
              "ref": "Luke 1:20, 63–64"
            },
            {
              "value": 300,
              "clue": "When Mary greeted her, this relative’s baby leaped in the womb.",
              "answer": "Who is Elizabeth?",
              "ref": "Luke 1:39–44"
            },
            {
              "value": 400,
              "clue": "The first birth announcement of Jesus was delivered to these nighttime workers outside Bethlehem.",
              "answer": "Who are shepherds?",
              "ref": "Luke 2:8–12"
            },
            {
              "value": 500,
              "clue": "In Revelation he battles the dragon, and in Jude he disputes over Moses’ body—this archangel.",
              "answer": "Who is Michael?",
              "ref": "Revelation 12:7; Jude 9"
            }
          ]
        },
        {
          "name": "Songs of Christmas",
          "clues": [
            {
              "value": 100,
              "clue": "Mary’s song of praise in Luke 1 is traditionally called this.",
              "answer": "What is the Magnificat?",
              "ref": "Luke 1:46–55"
            },
            {
              "value": 200,
              "clue": "Zechariah’s prophecy-song in Luke 1 is known by this Latin name.",
              "answer": "What is the Benedictus?",
              "ref": "Luke 1:68–79"
            },
            {
              "value": 300,
              "clue": "Simeon’s “Now you are dismissing your servant in peace…” is called this.",
              "answer": "What is the Nunc Dimittis?",
              "ref": "Luke 2:29–32"
            },
            {
              "value": 400,
              "clue": "The angels’ “Glory to God in the highest…” appears in this Gospel.",
              "answer": "What is Luke?",
              "ref": "Luke 2:13–14"
            },
            {
              "value": 500,
              "clue": "In Luke 1, Mary begins: “My soul magnifies the ___.”",
              "answer": "What is the Lord?",
              "ref": "Luke 1:46"
            }
          ]
        },
        {
          "name": "Names & Titles of Jesus",
          "clues": [
            {
              "value": 100,
              "clue": "Matthew explains that the name “Jesus” points to this mission for his people.",
              "answer": "What is to save them from their sins?",
              "ref": "Matthew 1:21"
            },
            {
              "value": 200,
              "clue": "Isaiah’s prophecy says the child will be called this, meaning “God with us.”",
              "answer": "What is Immanuel (Emmanuel)?",
              "ref": "Isaiah 7:14; Matthew 1:23"
            },
            {
              "value": 300,
              "clue": "John 1 calls Jesus the eternal ___ who became flesh.",
              "answer": "What is the Word?",
              "ref": "John 1:1, 14"
            },
            {
              "value": 400,
              "clue": "In Luke 2:11, the newborn is called “a Savior,” and also “the ___ the ___.”",
              "answer": "What is Christ the Lord?",
              "ref": "Luke 2:11"
            },
            {
              "value": 500,
              "clue": "In Revelation 19, Jesus is called “King of kings and ___ of ___.”",
              "answer": "What is Lord of lords?",
              "ref": "Revelation 19:16"
            }
          ]
        },
        {
          "name": "Light, Joy & Mission",
          "clues": [
            {
              "value": 100,
              "clue": "John’s prologue calls Jesus the true ___ that gives light to everyone.",
              "answer": "What is light?",
              "ref": "John 1:9"
            },
            {
              "value": 200,
              "clue": "The angel called Jesus’ birth “good news of great ___” for all the people.",
              "answer": "What is joy?",
              "ref": "Luke 2:10"
            },
            {
              "value": 300,
              "clue": "Matthew’s genealogy opens by calling Jesus “son of David, son of this patriarch.”",
              "answer": "Who is Abraham?",
              "ref": "Matthew 1:1"
            },
            {
              "value": 400,
              "clue": "Matthew begins the nativity story: “Jesus was born in Bethlehem of Judea in the days of ___.”",
              "answer": "Who is Herod (the king)?",
              "ref": "Matthew 2:1"
            },
            {
              "value": 500,
              "clue": "Simeon says Jesus will be “a light for revelation to the ___.”",
              "answer": "Who are the Gentiles?",
              "ref": "Luke 2:32"
            }
          ]
        }
      ]
    }
  ],
  "final": {
    "category": "The Word Made Flesh",
    "clue": "John says, “The Word became flesh and dwelt among us, and we have seen his ___, full of grace and truth.”",
    "answer": "What is glory?",
    "ref": "John 1:14"
  }
};

export type Clue = {
  id: string;
  round: string;
  category: string;
  value: number;
  clue: string;
  answer: string;
  ref: string;
};

export function buildClues() {
  const out: Clue[] = [];
  gameData.rounds.forEach((r, ri) => {
    r.categories.forEach((c, ci) => {
      c.clues.forEach((cl, qi) => {
        const id = `r${ri}-c${ci}-q${qi}`;
        out.push({
          id,
          round: r.name,
          category: c.name,
          value: cl.value,
          clue: cl.clue,
          answer: cl.answer,
          ref: cl.ref,
        });
      });
    });
  });
  return out;
}

export const allClues: Clue[] = buildClues();
