import { useState } from 'react';
import { table1Data, table2Data, table3Data } from '../data/oxytropisData.js';
import style from './OxytropisAnalysis.module.css';

export default function OxytropisAnalysis() {
  const [activeTab, setActiveTab] = useState('text');
  const [activeTable, setActiveTable] = useState('table1');
  const [selectedSystem, setSelectedSystem] = useState('bunge');

  return (
      <>
        <div className={style.container}>
          <div className={style.main__content}>
            <header className={style.header}>
              <h1 className={style.species__title}>
                Сравнение двух подходов классификации Остролодочников (Oxytropis DC): классической морфологической системы А. Бунге (1874) и молекулярно-филогенетической структуры (2016)
              </h1>
              <p className={style.header__subtitle}>
                База исследования: ревизия 92 видов Азиатской России на основе данных Kholina et al. (2016)
              </p>
            </header>

            <div className={style['species-list__controls']}>
              <button
                  className={`${style['analysis-tab-btn']} ${activeTab === 'text' ? style['analysis-tab-btn__active'] : ''}`}
                  onClick={() => setActiveTab('text')}
              >
                Текст статьи
              </button>
              <button
                  className={`${style['analysis-tab-btn']} ${activeTab === 'viz' ? style['analysis-tab-btn__active'] : ''}`}
                  onClick={() => setActiveTab('viz')}
              >
                Интерактив объема
              </button>
              <button
                  className={`${style['analysis-tab-btn']} ${activeTab === 'tables' ? style['analysis-tab-btn__active'] : ''}`}
                  onClick={() => setActiveTab('tables')}
              >
                Таблицы данных
              </button>
            </div>

            {activeTab === 'text' && (
                <div className={style['species-list__text-tab']}>
                  <div className={style.species__block}>
                    <h3 className={style.subgenus__title}>Аннотация</h3>
                    <p className={style.genus__description_clean}>
                      В статье представлен критический анализ таксономической структуры рода Остролодочник (<i>Oxytropis</i> DC., Fabaceae) на основе сопоставления классической морфологической системы А. Бунге (1874) и современных филогенетических данных (Kholina et al., 2016). На примере репрезентативной выборки из 92 видов продемонстрировано глубокое расхождение между искусственными макроморфологическими таксонами, выделенными по строению боба, и монофилетическими кладами хлоропластной ДНК.
                    </p>
                  </div>

                  <div className={style['text-grid']}>
                    <div className={style.species__block}>
                      <h4 className={style['species__section-name']}>Введение</h4>
                      <p className={style.genus__description_intro}>
                        Род Остролодочник (<i>Oxytropis</i> DC.) представляет собой один из наиболее эволюционно динамичных и таксономически сложных таксонов в семействе Бобовые (Fabaceae). На протяжении полутора веков фундаментальной основой внутриродовой систематики оставалась классическая монография А. Бунге (Bunge, 1874), базирующаяся на строении плода — наличии и топографии брюшных и спинных перегородок боба. По этому макроморфологическому признаку род традиционно разделялся на четыре макро-подрода.
                      </p>
                    </div>
                    <div className={style.species__block}>
                      <h4 className={style['species__section-name']}>Материалы и методы</h4>
                      <p className={style.genus__description_intro}>
                        Материалом послужил интегрированный массив данных флористических каталогов Азиатско-Гербарного сектора (АГС), бинарные списки таксонов из оригинальных гербарных коллекций региона, а также валидированная цифровая база данных (taxonomy.js). Таксономический пересчет выполнен путем поштучного картирования и распределения каждого из 92 видов по двум альтернативным системам с учетом критической ревизии подходов Бунге и современных молекулярных маркеров (Kholina et al., 2016).
                      </p>
                    </div>
                  </div>

                  <div className={style.species__block_highlighted}>
                    <h4 className={style.species__section_title}>
                      Причины изменения количества видов в подроде Oxytropis
                    </h4>
                    <p className={style.genus__description_leading}>
                      Динамика изменения количества видов в подроде <i>Oxytropis</i> (с развитыми перегородками плода) при переходе от классической системы А. Бунге (1874) к молекулярно-филогенетической структуре Kholina et al. (2016): в системе Бунге этот подрод включал 69 видов, а в современной филогении их число резко уменьшилось всего до 11 видов (из общей выборки в 92 вида).
                    </p>
                    <p className={style.genus__description_subtitle}>
                      Количество видов в подроде <i>Oxytropis</i> стало меньше по двум главным причинам:
                    </p>
                    <ul className={style.block_list}>
                      <li>
                        <strong>Искусственность старого признака (Конвергентная эволюция):</strong> Классическая система Александра Бунге базировалась исключительно на макроморфологическом признаке плода — наличии и строении перегородок в бобах. Современные ДНК-исследования (хлоропластной ДНК) показали, что этот признак развивался у разных групп растений независимо друг от друга в процессе адаптации (конвергентно). То, что Бунге считал одной близкородственной группой, оказалось эволюционно далекими линиями.
                      </li>
                      <li>
                        <strong>Колоссальное расширение подрода Phacoxytropis:</strong> Генетический анализ выявил, что большинство секций (такие как <i>Xerobia</i>, <i>Baicalia</i>, <i>Polyadena</i> и др.), которые раньше относили к другим группам из-за строения плодов, филогенетически принадлежат к ветви <i>Phacoxytropis</i>. Из-за этого «истинный» подрод <i>Oxytropis</i> сузился до своего жесткого генетического ядра (в основном секции <i>Janthina</i>), а остальные 58 видов были перенесены в подрод <i>Phacoxytropis</i>, объем которого вырос с 19 до 78 видов.
                      </li>
                    </ul>
                  </div>
                </div>
            )}

            {activeTab === 'viz' && (
                <div className={style['species-list']}>
                  <div className={`${style.species__block} ${style.species__block__mb20}`}>
                    <h3 className={style['genus-title']}>Перераспределение объемов подродов</h3>
                    <p className={style['viz-description']}>
                      Выберите систему классификации, чтобы наглядно увидеть искусственность признака перегородок плода и эволюционную радиацию.
                    </p>

                    <div className={style['analysis-systems-container']}>
                      <button
                          className={`${style['system-toggle-btn']} ${selectedSystem === 'bunge' ? style['system-toggle-btn__active'] : ''}`}
                          onClick={() => setSelectedSystem('bunge')}
                      >
                        Система А. Бунге (1874)
                      </button>
                      <button
                          className={`${style['system-toggle-btn']} ${selectedSystem === 'kholina' ? style['system-toggle-btn__active'] : ''}`}
                          onClick={() => setSelectedSystem('kholina')}
                      >
                        Филогения Kholina (2016)
                      </button>
                    </div>

                    <div className={style['viz-scale-wrapper']}>
                      <div className={style['viz-scale-item']}>
                        <div className={style['viz-scale-header']}>
                          <strong className={style['viz-scale-title']}>Подрод Oxytropis (С развитыми перегородками плода)</strong>
                          <span className={style['viz-scale-badge']}>
                          {selectedSystem === 'bunge' ? '69 видов' : '11 видов'}
                        </span>
                        </div>
                        <div className={style['viz-progress-bg']}>
                          <div
                              className={`${style['viz-progress-bar']} ${style['viz-progress-bar__first']}`}
                              style={{ '--progress-width': selectedSystem === 'bunge' ? '75%' : '12%' }}
                          />
                        </div>
                        <p className={style['viz-scale-text']}>
                          {selectedSystem === 'bunge'
                              ? 'Включал absolute разнообразие видов (75%). Согласно Бунге, наличие перегородок определяло монофилию группы.'
                              : 'Глубокое сужение объема подрода. Генетически истинный подрод ограничен лишь ядром секции Janthina. Остальные секции оказались конвергентными.'
                          }
                        </p>
                      </div>

                      <div className={style['viz-scale-item']}>
                        <div className={style['viz-scale-header']}>
                          <strong className={style['viz-scale-title']}>Подрод Phacoxytropis (Одногнездные плоды без перегородок)</strong>
                          <span className={style['viz-scale-badge']}>
                          {selectedSystem === 'bunge' ? '19 видов' : '78 видов'}
                        </span>
                        </div>
                        <div className={style['viz-progress-bg']}>
                          <div
                              className={`${style['viz-progress-bar']} ${style['viz-progress-bar__second']}`}
                              style={{ '--progress-width': selectedSystem === 'bunge' ? '20%' : '85%' }}
                          />
                        </div>
                        <p className={style['viz-scale-text']}>
                          {selectedSystem === 'bunge'
                              ? 'Рассматривался Бунге как маргинальная маловидовая эволюционная ветвь растений с одногнездными плодами.'
                              : 'Колоссальное расширение группы. Молекулярное маркирование показало, что сюда филогенетически относятся секции Xerobia, Baicalia, Polyadena и др.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {activeTab === 'tables' && (
                <div className={style['species-list']}>
                  <div className={style['table-nav-container']}>
                    <button className={`${style['table-nav-btn']} ${activeTable === 'table1' ? style.active : ''}`} onClick={() => setActiveTable('table1')}>Таблица 1</button>
                    <button className={`${style['table-nav-btn']} ${activeTable === 'table2' ? style.active : ''}`} onClick={() => setActiveTable('table2')}>Таблица 2</button>
                    <button className={`${style['table-nav-btn']} ${activeTable === 'table3' ? style.active : ''}`} onClick={() => setActiveTable('table3')}>Таблица 3</button>
                  </div>

                  {activeTable === 'table1' && (
                      <div className={style['table-wrapper']}>
                        <table className={`${style['data-table']} ${style['data-table__t1']}`}>
                          <thead>
                          <tr>
                            <th>Подрод / Филогенетическая клада</th>
                            <th className={style['th__center']}>По Бунге (1874)</th>
                            <th className={style['th__center']}>По Kholina (2016)</th>
                            <th>Характер эволюционных изменений</th>
                          </tr>
                          </thead>
                          <tbody>
                          {table1Data.map((row, idx) => (
                              <tr key={idx}>
                                <td className={style['td__bold']}>{row.group}</td>
                                <td className={`${style['td__center']} ${style['td__blue-bold']}`}>{row.bunge}</td>
                                <td className={`${style['td__center']} ${style['td__green-bold']}`}>{row.kholina}</td>
                                <td className={style['td__muted']}>{row.change}</td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                  )}

                  {activeTable === 'table2' && (
                      <div className={style['table-wrapper']}>
                        <table className={`${style['data-table']} ${style['data-table__t2']}`}>
                          <thead>
                          <tr>
                            <th>Подрод по Бунге</th>
                            <th>Секция</th>
                            <th className={style['th__center']}>Видов</th>
                            <th>Представители выборки</th>
                          </tr>
                          </thead>
                          <tbody>
                          {table2Data.map((row, idx) => (
                              <tr key={idx}>
                                <td className={style['td__bold']}>{row.subgenus}</td>
                                <td className={style['td__italic-blue']}>{row.section}</td>
                                <td className={`${style['td__center']} ${style['td__bold']}`}>{row.count}</td>
                                <td className={style['td__light-muted']}>{row.species}</td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                  )}

                  {activeTable === 'table3' && (
                      <div className={style['table-wrapper']}>
                        <table className={`${style['data-table']} ${style['data-table__t3']}`}>
                          <thead>
                          <tr>
                            <th>Клада / Подрод</th>
                            <th>Филолиния (Секция)</th>
                            <th className={style['th__center']}>Видов</th>
                            <th>Статус ревизии</th>
                            <th>Видовой состав</th>
                          </tr>
                          </thead>
                          <tbody>
                          {table3Data.map((row, idx) => (
                              <tr key={idx}>
                                <td className={style['td__bold']}>{row.clade}</td>
                                <td className={style['td__italic-green']}>{row.line}</td>
                                <td className={`${style['td__center']} ${style['td__bold']}`}>{row.count}</td>
                                <td><span className={style['status-badge']}>{row.status}</span></td>
                                <td className={style['td__light-muted']}>{row.species}</td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                  )}
                </div>
            )}
          </div>
        </div>
      </>
  );
}
