import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Droplets,
  ExternalLink,
  Mountain,
  Radio,
  ShieldCheck,
  Waves,
} from "lucide-react";

const scenarioData = [
  {
    id: "yr4",
    label: "Астероид 2024 YR4",
    icon: <Radio size={18} />,
    probability: "0,001%",
    status: "Риск снят",
    description:
      "Актуальные расчёты ESA не указывают на столкновение с Землёй в 2032 году.",
    tone: "cyan",
  },
  {
    id: "elbrus",
    label: "Извержение Эльбруса",
    icon: <Mountain size={18} />,
    probability: "не считается",
    status: "Не ведёт к затоплению Москвы",
    description:
      "Вулкан может вызвать региональные опасности на Кавказе, но не сдвинет плиты и не поднимет море до Москвы.",
    tone: "violet",
  },
  {
    id: "rivers",
    label: "Ливни и разлив рек",
    icon: <Waves size={18} />,
    probability: "локально",
    status: "Реальный риск",
    description:
      "Подтопления низин и пойм возможны после экстремальных осадков или аварий на гидросооружениях.",
    tone: "amber",
  },
];

function formatDate() {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function Home() {
  const [probability, setProbability] = useState(79);
  const [activeScenario, setActiveScenario] = useState("rivers");
  const [showDetails, setShowDetails] = useState(false);

  const active = useMemo(
    () => scenarioData.find((item) => item.id === activeScenario) ?? scenarioData[2],
    [activeScenario],
  );

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar container">
        <a className="brand" href="#top" aria-label="Москва под водой — на главную">
          <span className="brand-mark"><Droplets size={17} strokeWidth={2.5} /></span>
          <span>ПОЛЕВОЙ БРИФИНГ <b>/</b> 07</span>
        </a>
        <div className="top-meta">
          <span className="live-dot" />
          <span>Сценарный режим</span>
          <span className="top-date">{formatDate()}</span>
        </div>
      </header>

      <section className="hero container" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> Карта угрозы · Москва и МО</p>
          <h1>Когда вода<br /><em>накроет</em> Москву?</h1>
          <p className="hero-lead">
            Разбираем громкое число <strong>79%</strong> без паники: это выбранная пользователем вероятность сценария, а не научный прогноз.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#calculator">Проверить сценарий <ChevronRight size={17} /></a>
            <a className="text-link" href="#facts">Что известно точно <ArrowDownRight size={16} /></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Схематичная карта Москвы у линии воды">
          <div className="visual-label label-top"><span className="pulse" /> МОНИТОРИНГ <b>LIVE</b></div>
          <div className="contour contour-a" />
          <div className="contour contour-b" />
          <div className="contour contour-c" />
          <div className="map-grid" />
          <div className="city-shape">
            <span className="river river-one" />
            <span className="river river-two" />
            <span className="ring ring-one" />
            <span className="ring ring-two" />
            <span className="city-core"><span>МОСКВА</span><small>55°45′N · 37°37′E</small></span>
          </div>
          <div className="waterline"><span>ГИПОТЕТИЧЕСКАЯ ЛИНИЯ ВОДЫ</span><i /></div>
          <div className="visual-label label-bottom">ВЫСОТА ГОРОДА <b>130–250 м</b></div>
        </div>
      </section>

      <section className="notice container">
        <div className="notice-icon"><CircleHelp size={20} /></div>
        <div>
          <p className="notice-title">Главное уточнение</p>
          <p>Вероятность <strong>79%</strong> сама по себе ничего не говорит о том, <em>когда</em> произойдёт событие. Нужны причина, модель, срок и измеряемый масштаб. Для затопления всей Москвы и МО такого подтверждённого сценария нет.</p>
        </div>
        <span className="notice-tag">НЕ ПРОГНОЗ</span>
      </section>

      <section className="section container" id="calculator">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>02</span> Сценарный калькулятор</p>
            <h2>Что означает<br /><em>79 процентов?</em></h2>
          </div>
          <p className="section-intro">Поставьте любое значение и увидите, почему процент без контекста не превращается в дату катастрофы.</p>
        </div>

        <div className="calculator-grid">
          <div className="probability-card">
            <div className="card-topline"><span>Ваша гипотеза</span><span className="mono">SCN–{String(probability).padStart(2, "0")}</span></div>
            <div className="probability-number"><span>{probability}</span><b>%</b></div>
            <p className="probability-caption">вероятность события<br /><strong>«Москва и МО накрыты водой»</strong></p>
            <div className="range-wrap">
              <input aria-label="Гипотетическая вероятность" type="range" min="0" max="100" value={probability} onChange={(event) => setProbability(Number(event.target.value))} style={{ "--range-progress": `${probability}%` } as React.CSSProperties} />
              <div className="range-labels"><span>0</span><span>50</span><span>100%</span></div>
            </div>
            <div className="interpretation"><span className="interpretation-icon"><AlertTriangle size={17} /></span><span><b>{probability >= 70 ? "Высокая цифра — не дата" : "Цифра без модели"}</b><br />Это не отвечает на вопрос «когда».</span></div>
          </div>

          <div className="timeline-card">
            <div className="card-topline"><span>Почему нельзя назвать год</span><span className="status-chip"><span className="chip-dot" /> проверка логики</span></div>
            <div className="timeline">
              <div className="timeline-item"><span className="timeline-index">01</span><div><b>Причина</b><p>Что именно поднимает воду: ливни, река, авария или океан?</p></div></div>
              <div className="timeline-item"><span className="timeline-index">02</span><div><b>Масштаб</b><p>Подтопленный подвал — не то же самое, что вся область.</p></div></div>
              <div className="timeline-item"><span className="timeline-index">03</span><div><b>Срок</b><p>Без даты и доверительного интервала это не прогноз.</p></div></div>
            </div>
            <div className="answer-bar"><span className="answer-mark">≈</span><span><b>Ответ сейчас:</b> определённой даты нет</span><ArrowUpRight size={17} /></div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="facts">
        <div className="container">
          <div className="section-heading light-heading">
            <div><p className="eyebrow"><span>03</span> Три сценария, три масштаба</p><h2>Что действительно<br /><em>может случиться?</em></h2></div>
            <p className="section-intro">Нажмите на карточку, чтобы сравнить громкие гипотезы с физикой и текущими оценками риска.</p>
          </div>
          <div className="scenario-layout">
            <div className="scenario-list">
              {scenarioData.map((scenario) => (
                <button key={scenario.id} className={`scenario-item ${activeScenario === scenario.id ? "active" : ""} tone-${scenario.tone}`} onClick={() => setActiveScenario(scenario.id)}>
                  <span className="scenario-icon">{scenario.icon}</span><span className="scenario-copy"><b>{scenario.label}</b><small>{scenario.status}</small></span><span className="scenario-prob">{scenario.probability}</span><ChevronRight size={17} className="scenario-arrow" />
                </button>
              ))}
            </div>
            <div className="scenario-detail">
              <div className={`detail-icon tone-${active.tone}`}>{active.icon}</div>
              <p className="detail-kicker">Сценарий выбран</p><h3>{active.label}</h3><p>{active.description}</p>
              <div className="detail-foot"><span>Масштаб последствий</span><div className="scale"><i /><i /><i className="muted" /><i className="muted" /><i className="muted" /></div><b>{active.id === "rivers" ? "локальный" : "региональный"}</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container final-section">
        <div className="final-card">
          <div className="final-orbit"><ShieldCheck size={30} /><span>0</span></div>
          <div><p className="eyebrow"><span>04</span> Итоговый статус</p><h2>Дата затопления Москвы<br /><em>не определена</em></h2><p>Нет достоверного механизма, по которому 79% превращаются в календарную дату. Проверяйте источник, причину, горизонт прогноза и официальный уровень опасности.</p></div>
          <button className="ghost-btn" onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Скрыть детали" : "Показать детали"} <ChevronRight size={16} /></button>
        </div>
        {showDetails && <div className="details-panel"><b>Как читать такие сообщения</b><span>1. Найдите первоисточник.</span><span>2. Проверьте, что именно измеряет процент.</span><span>3. Отделяйте локальное подтопление от затопления региона.</span></div>}
      </section>

      <footer className="footer container"><span>Москва под водой? <b>Данные важнее паники.</b></span><span>Справочный интерфейс · не является официальным прогнозом</span><a href="https://science.nasa.gov/solar-system/asteroids/2024-yr4/" target="_blank" rel="noreferrer">NASA / 2024 YR4 <ExternalLink size={13} /></a></footer>
    </main>
  );
}

