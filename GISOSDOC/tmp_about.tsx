"use client";

import { MapPin, Users, Award, Camera, X } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

type RoleKey = "board" | "scientific" | "president_board" | "vice_president_board" | "secretary_general_board" | "academic_secretary_board";

const team: { name: string; nameEn: string; role: RoleKey; photo?: string }[] = [
  { name: "თენგიზ გორდეზიანი", nameEn: "Tengiz Gordeziani", role: "president_board" },
  { name: "თედო გორგოძე", nameEn: "Tedo Gorgodze", role: "vice_president_board" },
  { name: "ზურაბ ლაოშვილი", nameEn: "Zurab Laoshvili", role: "vice_president_board" },
  { name: "გოჩა გუძუაძე", nameEn: "Gocha Gudzuadze", role: "vice_president_board" },
  { name: "საბა მოდებაძე", nameEn: "Saba Modebadze", role: "secretary_general_board" },
  { name: "მარიამ გაგოშაშვილი", nameEn: "Mariam Gagoshashvili", role: "board" },
  { name: "რევაზ თოლორდავა", nameEn: "Revaz Tolordava", role: "board" },
  { name: "ხატია ყველაშვილი", nameEn: "Khatia Kvelashvili", role: "academic_secretary_board" },
  { name: "ილია ქავთარაძე", nameEn: "Ilia Kavtaradze", role: "board" },
  { name: "ლიკა ცერცვაძე", nameEn: "Lika Tsertsvadze", role: "board", photo: "/team/lika_cercvadze.jpg" },
  { name: "გიორგი ბერუჩაშვილი", nameEn: "Giorgi Beruchashvili", role: "scientific" },
  { name: "ლალი გოგინავა", nameEn: "Lali Goginava", role: "scientific" },
  { name: "სოფიო გორგიჯანიძე", nameEn: "Sopio Gorgijanidze", role: "scientific" },
  { name: "გიორგი დვალაშვილი", nameEn: "Giorgi Dvalashvili", role: "scientific" },
  { name: "ნოდარ ელიზბარაშვილი", nameEn: "Nodar Elizbarashvili", role: "scientific" },
  { name: "თეონა თიგიშვილი", nameEn: "Teona Tigishvili", role: "scientific" },
  { name: "გიორგი კაპანაძე", nameEn: "Giorgi Kapanadze", role: "scientific", photo: "/team/Giorgi_Kapanadze.jpg" },
  { name: "ნატო მაისურაძე", nameEn: "Nato Maisuradze", role: "scientific" },
  { name: "რობერტ მაღლაკელიძე", nameEn: "Robert Maghlakelidze", role: "scientific" },
  { name: "დემეტრე მოდებაძე", nameEn: "Demetre Modebadze", role: "scientific" },
  { name: "გიორგი მძელური", nameEn: "Giorgi Mdzeluri", role: "scientific" },
  { name: "დავით სვანაძე", nameEn: "Davit Svanadze", role: "scientific" },
  { name: "მანანა შარაშენიძე", nameEn: "Manana Sharashenidze", role: "scientific" },
  { name: "ვანო ცარციძე", nameEn: "Vano Tsartsidze", role: "scientific" },
  { name: "ნოდარ ხორბალაძე", nameEn: "Nodar Khorbaladze", role: "scientific" },
  { name: "თამარ ჭიჭინაძე", nameEn: "Tamar Chichinadze", role: "scientific" },
  { name: "ნიკა ბერუჩაშვილი", nameEn: "Nika Beruchashvili", role: "scientific" },
  { name: "ვლადიმერ ბუაჩიძე", nameEn: "Vladimer Buachidze", role: "scientific" },
  { name: "გიორგი გაფრინდაშვილი", nameEn: "Giorgi Gaprindashvili", role: "scientific" },
];

function TeamCard({
  name,
  roleLabel,
  bio,
  photo,
}: {
  name: string;
  roleLabel: string;
  bio: string;
  photo: string | null;
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-[#0a2342]/10 hover:shadow-md transition-shadow">
      <div className="h-48 bg-[#0a2342]/5 flex items-center justify-center relative">
        {photo ? (
          <Image src={photo} alt={name} fill className="object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#0a2342]/25">
            <Camera size={32} />
          </div>
        )}
      </div>
      <div className="p-5 text-center">
        <h3 className="font-bold text-[#0a2342] font-serif text-lg">{name}</h3>
        <p className="text-[#c8a951] text-sm font-semibold mt-1">{roleLabel}</p>
        <p className="text-[#0a2342]/60 text-xs mt-3 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);

  const roleKeys: ("board" | "scientific")[] = ["board", "scientific"];

  const isBoardRole = (role: RoleKey) => role !== "scientific";

  const roleLabel = (key: RoleKey): string => {
    switch (key) {
      case "president_board": return t("role_president_board");
      case "vice_president_board": return t("role_vice_president_board");
      case "secretary_general_board": return t("role_secretary_general_board");
      case "academic_secretary_board": return t("role_academic_secretary_board");
      case "scientific": return t("role_scientific");
      default: return t("role_board");
    }
  };

  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const matchesName = member.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRole =
        selectedRole === null ||
        (selectedRole === "board" ? isBoardRole(member.role) : member.role === selectedRole);
      return matchesName && matchesRole;
    });
  }, [searchQuery, selectedRole]);

  const historyItems = [
    { year: "1998", textKey: "history_1998" as const },
    { year: "2006", textKey: "history_2006" as const },
    { year: "2014", textKey: "history_2014" as const },
    { year: "2015", textKey: "history_2015" as const },
    { year: "2017", textKey: "history_2017" as const },
    { year: "2018", textKey: "history_2018" as const },
    { year: "2019", textKey: "history_2019" as const },
    { year: "2020", textKey: "history_2020" as const },
    { year: "2022", textKey: "history_2022" as const },
    { year: "2023", textKey: "history_2023" as const },
    { year: "2024", textKey: "history_2024" as const },
    { year: "2025", textKey: "history_2025" as const },
  ];

  const missionCards = [
    { icon: MapPin, titleKey: "mission" as const, textKey: "mission_text" as const },
    { icon: Users, titleKey: "vision" as const, textKey: "vision_text" as const },
    { icon: Award, titleKey: "values" as const, textKey: "values_text" as const },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0a2342] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            {t("hero_title")}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">{t("hero_subtitle")}</p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionCards.map(({ icon: Icon, titleKey, textKey }) => (
              <div key={titleKey} className="p-6 rounded-lg border border-[#0a2342]/10 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#c8a951]/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#c8a951]" />
                </div>
                <h3 className="font-bold text-[#0a2342] text-lg mb-2 font-serif">{t(titleKey)}</h3>
                <p className="text-[#0a2342]/65 text-sm leading-relaxed">{t(textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-[#f8f5ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-2">
              {t("chronology")}
            </p>
            <h2 className="text-3xl font-bold text-[#0a2342] font-serif">{t("history")}</h2>
          </div>
          <div className="relative border-l-2 border-[#c8a951]/40 pl-8 space-y-8 max-w-2xl">
            {historyItems.map(({ year, textKey }) => (
              <div key={year} className="relative">
                <div className="absolute -left-[2.6rem] w-5 h-5 rounded-full bg-[#c8a951] border-4 border-[#f8f5ef]" />
                <span className="text-[#c8a951] font-bold text-sm">{year}</span>
                <p className="text-[#0a2342] mt-1">{t(textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#c8a951] text-sm font-semibold uppercase tracking-widest mb-2">
              {t("team")}
            </p>
            <h2 className="text-3xl font-bold text-[#0a2342] font-serif">{t("board")}</h2>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t("search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#0a2342]/20 focus:outline-none focus:ring-2 focus:ring-[#c8a951] text-[#0a2342] placeholder-[#0a2342]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0a2342]/40 hover:text-[#0a2342]"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRole(null)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedRole === null
                    ? "bg-[#0a2342] text-white"
                    : "bg-[#0a2342]/10 text-[#0a2342] hover:bg-[#0a2342]/20"
                }`}
              >
                {t("all")} ({team.length})
              </button>
              {roleKeys.map((key) => {
                const count = team.filter((m) => key === "board" ? isBoardRole(m.role) : m.role === key).length;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedRole(key)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedRole === key
                        ? "bg-[#c8a951] text-[#0a2342]"
                        : "bg-[#c8a951]/10 text-[#0a2342] hover:bg-[#c8a951]/20"
                    }`}
                  >
                    {roleLabel(key)} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {filteredTeam.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredTeam.map((member, i) => (
                <TeamCard
                  key={i}
                  name={locale === "en" ? member.nameEn : member.name}
                  roleLabel={roleLabel(member.role)}
                  bio={t("bio_placeholder")}
                  photo={member.photo ?? null}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#0a2342]/60 text-lg">{t("no_results")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
