import { Component } from '@angular/core';
import { Article } from '../models/article';

@Component({
  selector: 'app-med-articles',
  templateUrl: './med-articles.component.html',
  styleUrls: ['./med-articles.component.scss']
})
export class MedArticlesComponent {
  articles: Article[];
  breakpoint: number = 2;
  rh = '4:1';

  lgScreen = 1500;
  mdScreen = 500;

  resize(targetWidth) {
    if (targetWidth > this.lgScreen) {
      this.breakpoint = 2;
      this.rh = '2 : 0.75';
    } else if (targetWidth <= this.lgScreen && targetWidth > this.mdScreen) {
      this.breakpoint = 2;
      this.rh = '1.25 : 0.75';
    } else {
      this.breakpoint = 1;
      this.rh = '1 : 0.5';
    }
  }

  ngOnInit() {
    this.resize(window.innerWidth);
  }
  
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  constructor() {

    this.articles = [];
    let article = new Article();
    article.id = 1;
    article.title = "Коронавирус (Covid-19). ограничения передвижения и обязательная вакцинация в субъектах Российской Федерации";
    article.annotation = "Справочная информация: \"Коронавирус (COVID-19). Ограничения передвижения и обязательная вакцинация в субъектах Российской Федерации\"";
    article.text = TEXT_CORONAVIRUS;

    let article2 = new Article();
    article2.id = 2;
    article2.title = "Памятка для населения профилактика ГРИППА и ОРВИ"
    article2.annotation = "Справочная информация: \"Способы неспецифической профилактики гриппа и ОРВИ\""
    article2.text = TEXT_GRIPP;

    let article3 = new Article();
    article3.id = 3;
    article3.title = "Сниженный иммунный статус: как защититься";
    article3.annotation = "Иммунодефицит — распространенное нарушение, которое приводит к серьезным рискам: от тяжелого течения коронавируса до развития онкологических заболеваний. Можно ли об иммунодефиците не знать, как его выявляют врачи и что делать для защиты организма при иммунодепрессии?";
    article3.text = TEXT_IMMUN;

    let article4 = new Article();
    article4.id = 4;
    article4.title = "Индекс массы тела";
    article4.annotation = "Как рассчитать степень ожирения и можно ли верить ИМТ";
    article4.text = TEXT_IMT;

    this.articles.push(article);
    this.articles.push(article2);
    this.articles.push(article3);
    this.articles.push(article4);
  }
}



const TEXT_CORONAVIRUS = `В связи с распространением новой коронавирусной инфекции (COVID-19) органами исполнительной власти субъектов РФ в соответствии с пунктом 1 Указа Президента РФ от 11.05.2020 N 316 реализуется комплекс ограничительных и иных мероприятий по обеспечению санитарно-эпидемиологического благополучия населения.

В ряде субъектов РФ была введена обязательная вакцинация против новой коронавирусной инфекции (COVID-19) определенных категорий граждан.

За нарушение установленных ограничений в отдельных регионах введены дополнительные меры административной ответственности, если допущенные нарушения не содержат уголовно наказуемого деяния или не влекут административной ответственности в соответствии с КоАП РФ. По вопросам применения мер административной ответственности см. также обзоры по отдельным вопросам судебной практики, связанным с применением законодательства и мер по противодействию распространению на территории Российской Федерации новой коронавирусной инфекции (COVID-19) N 1, 2, 3, утв. Президиумом ВС РФ 21.04.2020, 30.04.2020, 17.02.2021.

`;

const TEXT_GRIPP = `Памятка для населения профилактика ГРИППА и ОРВИ

Что такое грипп?
Грипп - это тяжелая вирусная инфекция, которая поражает мужчин, женщин и детей всех возрастов и национальностей. Эпидемии гриппа случаются каждый год обычно в холодное время года. По количеству случаев в мире грипп и ОРВИ занимают первое место, удельный вес в структуре инфекционных заболеваний достигает 95%. 
Грипп и ОРВИ, постепенно подрывая здоровье, сокращают на несколько лет среднюю продолжительность жизни человека. При тяжелом течении гриппа часто возникают необратимые поражения сердечно-сосудистой системы, дыхательных органов, центральной нервной системы, провоцирующие заболевания сердца и сосудов, пневмонии, трахеобронхиты, менингоэнцефалиты. Распространенными осложнениями после гриппа являются риниты, синуситы, бронхиты, отиты, обострение хронических заболеваний, бактериальная суперинфекция. В ослабленный гриппом организм часто внедряется бактериальная инфекция (пневмококковая, гемофильная, стафилококковая). Наибольшие жертвы грипп собирает среди пожилых групп населения, страдающих хроническими болезнями. Смерть при гриппе может наступить от интоксикации, кровоизлияний в головной мозг, легочных осложнений (пневмония), сердечной или сердечно-легочной недостаточности.
Что такое ОРВИ? В чём отличие от гриппа?
Термин "острое респираторное заболевание" (ОРЗ) или "острая респираторная вирусная инфекция" (ОРВИ) охватывает большое количество заболеваний, во многом похожих друг на друга. Основное их сходство состоит в том, что все они вызываются вирусами, проникающими в организм вместе с вдыхаемым воздухом через рот и носоглотку, а также в том, что все они характеризуются одним и тем же набором симптомов. У больного несколько дней отмечается повышенная температура тела, воспаление в горле, кашель и головная боль. Самым распространенным симптомом респираторных заболеваний является насморк; он вызывается целым рядом родственных вирусов, известных как риновирусы. При выздоровлении, все эти симптомы исчезают и не оставляют после себя никаких следов.
Вирус гриппа очень легко передается. Самый распространенный путь передачи инфекции - воздушно-капельный. Также возможен и бытовой путь передачи, например через предметы обихода. При кашле, чихании, разговоре из носоглотки больного или вирусоносителя выбрасываются частицы слюны, слизи, мокроты с болезнетворной микрофлорой, в том числе с вирусами гриппа. Вокруг больного образуется зараженная зона с максимальной концентрацией аэрозольных частиц. Дальность их рассеивания обычно не превышает 2 - 3 м.
Симптомы гриппа.
Обычно грипп начинается остро. Инкубационный (скрытый) период, как правило, длится 2 - 5 дней. Затем начинается период острых клинических проявлений. Тяжесть болезни зависит от общего состояния здоровья, возраста, от того, контактировал ли больной с данным типом вируса ранее. В зависимости от этого у больного может развиться одна из четырех форм гриппа: легкая, среднетяжелая, тяжелая, гипертоксическая.
Профилактика гриппа и ОРВИ подразделяется на неспецифическую и специфическую.

\nСпособы неспецифической профилактики:
\n1.  Личная гигиена.
Иначе говоря, множество заболеваний связано с немытыми руками. Источник, как и прежде, больной человек. Избегать в этот период необходимо рукопожатий. После соприкосновений с ручками дверей, туалета, поручнями в общественных местах, обработать руки антисептиком или тщательно их вымыть. Не трогайте грязными, немытыми руками нос, глаза, рот.
\n2.  Промываем нос.
Даже если вы не умеете этого делать, пришла пора учиться. Сейчас многие доктора советуют увлажнять или промывать в период эпидемий нос. Это можно сделать при помощи солевого раствора (на литр воды 1 ч.ложка соли) или специальными соляными спреями, коих в аптеках множество.
\n3.Одеваем маски.
Причем одевать как раз стоит ее на больного человека, чтобы исключить попадание в пространство крупных частиц слюны при кашле и чихании, мелкие же частицы она не задерживает.
\n4.Тщательная уборка помещений. Вирус любит теплые и пыльные помещения, поэтому стоит уделить время влажной уборке и проветриванию.
\n5.Избегайте массовых скоплений людей. В этот период лучше воздержаться от походов в театры, цирки, кафе и прочие места, где могут оказаться инфицированные люди и где шанс подцепить вирус высок.
\n6. Другие методы, к которым можно отнести сбалансированное питание и здоровый образ жизни, занятие физкультурой, прогулки и многое другое.`;

const TEXT_IMMUN = `
Прежде всего, важно определиться с причинами иммунодефицита. Если, к примеру, фиксируется сниженное количество антител, что вызвано первичным иммунодефицитом, логика действий доктора будет выстроена в соответствии с одним сценарием. Может применяться заместительная коррекция недостающего звена иммунной системы путем введения недостающих иммуноглобулинов. Другой случай — если развился вторичный иммунодефицит, вызванный за счет наличия хронического очага инфекции: это может быть даже воспаленный корень зуба, который не лечили длительное время, или простатит. Конечно, в этих обстоятельствах рекомендации врача будут совсем иными. По этой причине определиться с логикой действий важно после обследования конкретного пациента.

Тем не менее, если пациент знает о наличии у себя каких-либо хронических заболеваний, он должен стараться избегать дополнительных угроз в любом случае. Это как минимум вакцинопрофилактика, средства индивидуальной защиты в общественных местах. 

Существуют также методы так называемой пассивной иммунизации — это введение в организм человека уже готовых антител. В качестве примера: для недоношенных детей существуют протоколы по введению антител против респираторно-синцитиальных вирусов, вызывающих инфекции дыхательных путей, поскольку легкие таких детей оказываются особенно уязвимы. Еще один актуальный пример — пассивная иммунизация с помощью моноклональных антител против тех или иных видов коронавируса нового типа: они могут вводиться в ранние сроки после контакта с вирусом или заранее, с профилактической целью.
`;

const TEXT_IMT = `
Индекс массы тела (ИМП) — это наиболее распространенный показатель, используемый для классификации ожирения и избыточного веса. 

Рассчитать ИМТ можно по очень простой формуле: масса человека (в килограммах) делится на квадрат роста (в метрах) — или воспользоваться одним из многочисленных калькуляторов.

Этот показатель, впервые описанный в 1832 году бельгийским астрономом, математиком и статистиком Адольфом Кетле, был известен как «индекс Кетле», пока в статье 1972 года американский физиолог Ансель Киз не предложил называть его индексом массы тела.

Как и любой другой показатель, ИМТ несовершенен, поскольку зависит только от роста и веса и не учитывает различные уровни ожирения в зависимости от возраста, уровня физической активности и пола, не дифференцирует жировую ткань от мышечной массы. При одинаковом ИМТ у женщин в среднем больше жира в организме, чем у мужчин, а у азиатов больше жира в организме, чем у европеоидов.

Поэтому, например, 21-летнему Арнольду Шварценеггеру, победившему в конкурсе «Мистер Вселенная», вполне можно было бы на основании ИМТ диагностировать ожирение I степени — при росте 188 сантиметров и весе 115 килограмм.

Дополнить оценку ИМТ можно с помощью таких показателей, как окружность талии, отношение объема талии к объему бедер, толщина кожных складок, а для большей точности рекомендуется провести биоимпедансометрию, то есть анализ состава своего тела.
`;