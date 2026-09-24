// Colours come from the Mauritian flag: red, blue, yellow, green.
export const STAGES = [
  { id: 1, name: "Dutch and French times", topic: "history", color: "#ea2839" },
  { id: 2, name: "British rule and labour", topic: "history", color: "#1a206d" },
  { id: 3, name: "Independence", topic: "history", color: "#ffd500" },
  { id: 4, name: "Map of Mauritius", topic: "geography", color: "#00a551" },
];

// [stage, level (1 easy - 3 hard), question, options, index of right answer, explanation]
// Check every fact against your PSAC textbook before you submit.
const raw = [
  [1, 1, "Which bird, once found on Mauritius, is now extinct?", ["Dodo", "Flamingo", "Parrot", "Owl"], 0, "The dodo disappeared in the 1600s, after the Dutch arrived."],
  [1, 1, "Which country gave our island the name 'Mauritius'?", ["Britain", "Holland (the Dutch)", "Portugal", "Spain"], 1, "The Dutch named it after Prince Maurice of Nassau."],
  [1, 2, "What did the French call the island?", ["Île Bourbon", "Île de France", "Île Rodrigues", "Île aux Cerfs"], 1, "Île Bourbon was the French name for Réunion."],
  [1, 2, "Which French governor developed Port Louis into a port and capital?", ["Abel Tasman", "Robert Farquhar", "Mahé de La Bourdonnais", "Wybrand van Warwyck"], 2, "Mahé de La Bourdonnais arrived in 1735."],
  [1, 3, "In which year did the Dutch start their first settlement on Mauritius?", ["1598", "1638", "1715", "1810"], 1, "The Dutch landed in 1598 but only settled in 1638."],
  [1, 3, "In which year did the French take possession of the island?", ["1638", "1715", "1810", "1835"], 1, "The French took the island in 1715, after the Dutch had left."],

  [2, 1, "Which country took Mauritius from the French in 1810?", ["Portugal", "Spain", "Britain", "Holland"], 2, "The British captured the island in 1810."],
  [2, 1, "Where did the first indentured labourers from India land in 1834?", ["Le Morne", "Aapravasi Ghat", "Blue Bay", "Curepipe"], 1, "Aapravasi Ghat, in Port Louis, is where they arrived."],
  [2, 2, "In which year was slavery abolished in Mauritius?", ["1810", "1835", "1968", "1992"], 1, "Slavery ended on 1 February 1835."],
  [2, 2, "Which mountain is a symbol of the slaves' fight for freedom?", ["Le Pouce", "Pieter Both", "Le Morne Brabant", "Trou aux Cerfs"], 2, "Le Morne Brabant is a UNESCO World Heritage Site."],
  [2, 3, "What do Mauritians remember on 2 November?", ["Independence", "Abolition of slavery", "Republic Day", "Arrival of indentured labourers"], 3, "It is Aapravasi Day, remembering the labourers who arrived in 1834."],
  [2, 3, "In which year did Aapravasi Ghat become a UNESCO World Heritage Site?", ["1992", "2006", "1968", "1835"], 1, "UNESCO listed Aapravasi Ghat in 2006."],

  [3, 1, "In which year did Mauritius become independent?", ["1810", "1968", "1992", "2006"], 1, "Mauritius became independent in 1968."],
  [3, 1, "Who was the first Prime Minister of independent Mauritius?", ["Sir Anerood Jugnauth", "Paul Bérenger", "Sir Seewoosagur Ramgoolam", "Navin Ramgoolam"], 2, "Sir Seewoosagur Ramgoolam led the country to independence."],
  [3, 2, "On which date is National Day celebrated?", ["1 February", "12 March", "2 November", "1 January"], 1, "National Day is 12 March, the date of independence in 1968."],
  [3, 2, "What are the colours of the Mauritian flag, from top to bottom?", ["Red, blue, yellow, green", "Blue, red, yellow, green", "Red, yellow, blue, green", "Green, yellow, blue, red"], 0, "Remember: red, blue, yellow, green."],
  [3, 3, "In which year did Mauritius become a Republic?", ["1968", "1982", "1992", "2000"], 2, "Mauritius became a Republic on 12 March 1992."],
  [3, 3, "Before becoming a Republic, who represented the Queen in Mauritius?", ["The President", "The Governor-General", "The Mayor", "The Chief Justice"], 1, "The Governor-General represented the Queen until 1992."],

  [4, 1, "What is the capital city of Mauritius?", ["Curepipe", "Mahébourg", "Port Louis", "Quatre Bornes"], 2, "Port Louis is the capital and main port."],
  [4, 1, "In which ocean is Mauritius found?", ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], 1, "Mauritius lies in the south-west of the Indian Ocean."],
  [4, 2, "How many districts does the island of Mauritius have?", ["5", "7", "9", "11"], 2, "There are 9 districts, from Port Louis to Savanne."],
  [4, 2, "Which island is an autonomous part of the Republic of Mauritius?", ["Réunion", "Madagascar", "Seychelles", "Rodrigues"], 3, "Rodrigues has its own Regional Assembly."],
  [4, 3, "In which district can you find the Seven Coloured Earths of Chamarel?", ["Flacq", "Black River", "Pamplemousses", "Moka"], 1, "Chamarel is in the district of Black River."],
  [4, 3, "In which district is the sacred lake Grand Bassin (Ganga Talao)?", ["Rivière du Rempart", "Port Louis", "Savanne", "Flacq"], 2, "Grand Bassin is in the district of Savanne."],
];

export const QUESTIONS = raw.map(([stage, level, q, options, answer, why], id) => ({
  id, stage, level, q, options, answer, why,
}));
