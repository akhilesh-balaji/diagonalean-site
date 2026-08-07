const team = [
  {
    name: "TVH Prathamesh",
    designation: "Assistant Professor",
    org: "Krea University",
    img: "https://www-cdn.krea.edu.in/sias/2023/07/T-V-H-Prathamesh.png",
  },
  {
    name: "Aalok Thakkar",
    designation: "Assistant Professor",
    org: "Ashoka University",
    img: "https://pbs.twimg.com/profile_images/2053520097759895553/v-4DG2b8.jpg",
  },
  {
    name: "Akhilesh Balaji",
    designation: "UG Student",
    org: "Ashoka University",
    img: "AB",
  },
  {
    name: "Kshitij Salunke",
    designation: "UG Student",
    org: "IISER Mohali",
    img: "KS",
  },
  {
    name: "Shashank Pandey",
    designation: "UG Student",
    org: "IISER Tirupati",
    img: "SP",
  },
];

function TeamMember({
  name,
  designation,
  org,
  img,
}: {
  name: string;
  designation: string;
  org: string;
  img: string;
}) {
  return (
    <div className="flex flex-col items-center text-center w-40">
      <div className="relative w-28 h-28 rounded-xl overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover grayscale contrast-110"
        />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{
            background: "linear-gradient(135deg, #002b36 0%, #268bd2 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-40"
          style={{
            background: "linear-gradient(135deg, #002b36 0%, transparent 60%)",
          }}
        />
      </div>
      <p className="mt-3 font-semibold text-secondary">{name}</p>
      <p className="text-sm text-secondary/70">{designation}</p>
      <p className="text-sm text-secondary/50">{org}</p>
    </div>
  );
}

export default function Team() {
  const [row1, row2] = [team.slice(0, 2), team.slice(2, 5)];

  return (
    <section id="team" className="w-full px-6 py-3 pb-10 max-w-5xl mx-auto">
      <div className="mt-10 flex flex-col items-center gap-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-secondary mb-2 justify-center text-center">
          The Governance Model for <span className="text-primary">Diagona</span>Lean
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-0 justify-center text-center">Steering Committee</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {row1.map((person, i) => (
            <TeamMember key={i} {...person} />
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-0 justify-center text-center">Maintainer Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {row2.map((person, i) => (
            <TeamMember key={i} {...person} />
          ))}
        </div>
      </div>
    </section>
  );
}
