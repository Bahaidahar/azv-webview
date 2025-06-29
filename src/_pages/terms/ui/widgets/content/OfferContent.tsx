"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Users, Car, Shield, Calendar } from "lucide-react";

interface Section {
  title: string;
  content: string[];
  icon: React.ReactNode;
}

export const OfferContent = () => {
  const sections: Section[] = [
    {
      title: "1. Общие положения",
      content: [
        "1.1. Настоящий документ является публичной офертой и содержит все существенные условия договора аренды автомобиля.",
        "1.2. Акцептом настоящей оферты является регистрация Пользователя в приложении и подтверждение согласия с условиями.",
        "1.3. После акцепта оферты Пользователь считается заключившим с Компанией договор аренды транспортного средства.",
      ],
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "2. Предмет договора",
      content: [
        "2.1. Компания предоставляет Пользователю автомобиль во временное владение и пользование за плату.",
        "2.2. Выбор автомобиля осуществляется Пользователем в приложении из доступных вариантов.",
        "2.3. Срок аренды определяется Пользователем самостоятельно в момент бронирования автомобиля.",
      ],
      icon: <Car className="w-5 h-5" />,
    },
    {
      title: "3. Права и обязанности сторон",
      content: [
        "3.1. Пользователь обязуется:",
        "- Использовать автомобиль бережно и по назначению",
        "- Соблюдать правила дорожного движения",
        "- Своевременно оплачивать услуги аренды",
        "3.2. Компания обязуется:",
        "- Предоставить технически исправный автомобиль",
        "- Обеспечить страховое покрытие",
        "- Оказывать техническую поддержку",
      ],
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-[#1D77FF]/10 rounded-full">
            <FileText className="w-8 h-8 text-[#1D77FF]" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-black">Публичная оферта</h1>
        <p className="text-black/60 max-w-2xl mx-auto">
          Договор аренды автомобилей AZV Motors. Ознакомьтесь с условиями
          предоставления услуг.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-[#1D77FF]/10 text-[#1D77FF]"
          >
            <Calendar className="w-3 h-3" />
            Действует с {new Date().toLocaleDateString("ru-RU")}
          </Badge>
          <Badge variant="outline" className="border-[#1D77FF] text-[#1D77FF]">
            Версия 2.1
          </Badge>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-[#1D77FF]/10 rounded-lg text-[#1D77FF]">
                  {section.icon}
                </div>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <div key={pIndex}>
                    {paragraph.startsWith("-") ? (
                      <div className="flex items-start gap-2 ml-4">
                        <div className="w-1.5 h-1.5 bg-[#1D77FF] rounded-full mt-2 flex-shrink-0" />
                        <p className="text-black/60">
                          {paragraph.substring(2)}
                        </p>
                      </div>
                    ) : (
                      <p
                        className={`${
                          paragraph.match(/^\d+\.\d+\./)
                            ? "font-medium text-black"
                            : "text-black/70"
                        }`}
                      >
                        {paragraph}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Terms */}
      <Card className="border-[#1D77FF] bg-[#1D77FF]/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Shield className="w-5 h-5 text-[#1D77FF]" />
            Дополнительные условия
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-black mb-2">Страхование</h4>
              <p className="text-sm text-black/80">
                Все автомобили застрахованы по КАСКО и ОСАГО. Франшиза
                составляет 50,000 ₸.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-black mb-2">Техподдержка</h4>
              <p className="text-sm text-black/80">
                Круглосуточная поддержка доступна через приложение или по
                телефону.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="bg-[#1D77FF]/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-black/60">
              Полный текст договора доступен для скачивания в формате PDF.
            </p>
            <p className="text-sm text-black/60">
              При возникновении вопросов обратитесь в службу поддержки.
            </p>
            <Separator className="my-4" />
            <p className="text-xs text-black/50">
              © 2024 AZV Motors. Все права защищены.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
