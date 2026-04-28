/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove('is-visible');
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });

    const carouselElements = document.querySelectorAll('.carousel');
    carouselElements.forEach((element) => {
        const intervalValue = Number(
            element.getAttribute('data-bs-interval') || element.getAttribute('data-carousel-interval')
        );
        if (window.bootstrap && Number.isFinite(intervalValue) && intervalValue > 0) {
            new window.bootstrap.Carousel(element, {
                interval: intervalValue,
                ride: element.getAttribute('data-bs-ride') || false,
            });
        }
    });

    const syncedCards = document.querySelectorAll('[data-sync-carousel]');
    const syncGroups = new Map();

    syncedCards.forEach((card) => {
        const targetId = card.getAttribute('data-sync-carousel');
        const slideIndex = Number(card.getAttribute('data-sync-slide'));
        if (!targetId || !Number.isFinite(slideIndex)) {
            return;
        }

        if (!syncGroups.has(targetId)) {
            syncGroups.set(targetId, []);
        }
        syncGroups.get(targetId).push(card);

        card.addEventListener('click', () => {
            const carouselElement = document.getElementById(targetId);
            if (!carouselElement || !window.bootstrap) {
                return;
            }

            const carousel = window.bootstrap.Carousel.getOrCreateInstance(carouselElement);
            carousel.to(slideIndex);
        });
    });

    syncGroups.forEach((cards, targetId) => {
        const carouselElement = document.getElementById(targetId);
        if (!carouselElement) {
            return;
        }

        const setActiveCard = (activeIndex) => {
            cards.forEach((card) => {
                const slideIndex = Number(card.getAttribute('data-sync-slide'));
                card.classList.toggle('is-active', slideIndex === activeIndex);
            });
        };

        setActiveCard(0);
        carouselElement.addEventListener('slid.bs.carousel', (event) => {
            setActiveCard(event.to);
        });
    });

    const topicSwitchers = document.querySelectorAll('[data-topic-switcher]');
    topicSwitchers.forEach((switcher) => {
        const tabs = switcher.querySelectorAll('.teaching-topic-tab');
        const panels = switcher.querySelectorAll('.teaching-topic-panel');

        if (!tabs.length || !panels.length) {
            return;
        }

        const setActiveTeachingTab = (activePanelId) => {
            tabs.forEach((tab, index) => {
                const isActive = tab.getAttribute('data-topic-panel') === activePanelId;
                tab.classList.toggle('active', isActive);
                if (isActive) {
                    tab.setAttribute('aria-current', 'true');
                } else {
                    tab.removeAttribute('aria-current');
                }

                // Fallback for malformed markup with missing panel ids.
                if (!tab.hasAttribute('data-topic-panel') && isActive) {
                    tab.dataset.topicPanel = panels[index]?.getAttribute('data-topic-panel-id') || '';
                }
            });

            panels.forEach((panel) => {
                const isActive = panel.getAttribute('data-topic-panel-id') === activePanelId;
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;
            });
        };

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                const activePanelId = tab.getAttribute('data-topic-panel')
                    || panels[index]?.getAttribute('data-topic-panel-id');
                if (activePanelId) {
                    setActiveTeachingTab(activePanelId);
                }
            });
        });

        const initialPanelId = switcher.querySelector('.teaching-topic-tab.active')?.getAttribute('data-topic-panel')
            || panels[0].getAttribute('data-topic-panel-id');
        if (initialPanelId) {
            setActiveTeachingTab(initialPanelId);
        }
    });

});
