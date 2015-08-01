import React, {Component, PropTypes} from 'react'
import cx from 'classnames'

const icons = {
	'ionicon-alert': '\uf101',
	'ionicon-alert-circled': '\uf100',
	'ionicon-android-add': '\uf2c7',
	'ionicon-android-add-circle': '\uf359',
	'ionicon-android-alarm-clock': '\uf35a',
	'ionicon-android-alert': '\uf35b',
	'ionicon-android-apps': '\uf35c',
	'ionicon-android-archive': '\uf2c9',
	'ionicon-android-arrow-back': '\uf2ca',
	'ionicon-android-arrow-down': '\uf35d',
	'ionicon-android-arrow-dropdown': '\uf35f',
	'ionicon-android-arrow-dropdown-circle': '\uf35e',
	'ionicon-android-arrow-dropleft': '\uf361',
	'ionicon-android-arrow-dropleft-circle': '\uf360',
	'ionicon-android-arrow-dropright': '\uf363',
	'ionicon-android-arrow-dropright-circle': '\uf362',
	'ionicon-android-arrow-dropup': '\uf365',
	'ionicon-android-arrow-dropup-circle': '\uf364',
	'ionicon-android-arrow-forward': '\uf30f',
	'ionicon-android-arrow-up': '\uf366',
	'ionicon-android-attach': '\uf367',
	'ionicon-android-bar': '\uf368',
	'ionicon-android-bicycle': '\uf369',
	'ionicon-android-boat': '\uf36a',
	'ionicon-android-bookmark': '\uf36b',
	'ionicon-android-bulb': '\uf36c',
	'ionicon-android-bus': '\uf36d',
	'ionicon-android-calendar': '\uf2d1',
	'ionicon-android-call': '\uf2d2',
	'ionicon-android-camera': '\uf2d3',
	'ionicon-android-cancel': '\uf36e',
	'ionicon-android-car': '\uf36f',
	'ionicon-android-cart': '\uf370',
	'ionicon-android-chat': '\uf2d4',
	'ionicon-android-checkbox': '\uf374',
	'ionicon-android-checkbox-blank': '\uf371',
	'ionicon-android-checkbox-outline': '\uf373',
	'ionicon-android-checkbox-outline-blank': '\uf372',
	'ionicon-android-checkmark-circle': '\uf375',
	'ionicon-android-clipboard': '\uf376',
	'ionicon-android-close': '\uf2d7',
	'ionicon-android-cloud': '\uf37a',
	'ionicon-android-cloud-circle': '\uf377',
	'ionicon-android-cloud-done': '\uf378',
	'ionicon-android-cloud-outline': '\uf379',
	'ionicon-android-color-palette': '\uf37b',
	'ionicon-android-compass': '\uf37c',
	'ionicon-android-contact': '\uf2d8',
	'ionicon-android-contacts': '\uf2d9',
	'ionicon-android-contract': '\uf37d',
	'ionicon-android-create': '\uf37e',
	'ionicon-android-delete': '\uf37f',
	'ionicon-android-desktop': '\uf380',
	'ionicon-android-document': '\uf381',
	'ionicon-android-done': '\uf383',
	'ionicon-android-done-all': '\uf382',
	'ionicon-android-download': '\uf2dd',
	'ionicon-android-drafts': '\uf384',
	'ionicon-android-exit': '\uf385',
	'ionicon-android-expand': '\uf386',
	'ionicon-android-favorite': '\uf388',
	'ionicon-android-favorite-outline': '\uf387',
	'ionicon-android-film': '\uf389',
	'ionicon-android-folder': '\uf2e0',
	'ionicon-android-folder-open': '\uf38a',
	'ionicon-android-funnel': '\uf38b',
	'ionicon-android-globe': '\uf38c',
	'ionicon-android-hand': '\uf2e3',
	'ionicon-android-hangout': '\uf38d',
	'ionicon-android-happy': '\uf38e',
	'ionicon-android-home': '\uf38f',
	'ionicon-android-image': '\uf2e4',
	'ionicon-android-laptop': '\uf390',
	'ionicon-android-list': '\uf391',
	'ionicon-android-locate': '\uf2e9',
	'ionicon-android-lock': '\uf392',
	'ionicon-android-mail': '\uf2eb',
	'ionicon-android-map': '\uf393',
	'ionicon-android-menu': '\uf394',
	'ionicon-android-microphone': '\uf2ec',
	'ionicon-android-microphone-off': '\uf395',
	'ionicon-android-more-horizontal': '\uf396',
	'ionicon-android-more-vertical': '\uf397',
	'ionicon-android-navigate': '\uf398',
	'ionicon-android-notifications': '\uf39b',
	'ionicon-android-notifications-none': '\uf399',
	'ionicon-android-notifications-off': '\uf39a',
	'ionicon-android-open': '\uf39c',
	'ionicon-android-options': '\uf39d',
	'ionicon-android-people': '\uf39e',
	'ionicon-android-person': '\uf3a0',
	'ionicon-android-person-add': '\uf39f',
	'ionicon-android-phone-landscape': '\uf3a1',
	'ionicon-android-phone-portrait': '\uf3a2',
	'ionicon-android-pin': '\uf3a3',
	'ionicon-android-plane': '\uf3a4',
	'ionicon-android-playstore': '\uf2f0',
	'ionicon-android-print': '\uf3a5',
	'ionicon-android-radio-button-off': '\uf3a6',
	'ionicon-android-radio-button-on': '\uf3a7',
	'ionicon-android-refresh': '\uf3a8',
	'ionicon-android-remove': '\uf2f4',
	'ionicon-android-remove-circle': '\uf3a9',
	'ionicon-android-restaurant': '\uf3aa',
	'ionicon-android-sad': '\uf3ab',
	'ionicon-android-search': '\uf2f5',
	'ionicon-android-send': '\uf2f6',
	'ionicon-android-settings': '\uf2f7',
	'ionicon-android-share': '\uf2f8',
	'ionicon-android-share-alt': '\uf3ac',
	'ionicon-android-star': '\uf2fc',
	'ionicon-android-star-half': '\uf3ad',
	'ionicon-android-star-outline': '\uf3ae',
	'ionicon-android-stopwatch': '\uf2fd',
	'ionicon-android-subway': '\uf3af',
	'ionicon-android-sunny': '\uf3b0',
	'ionicon-android-sync': '\uf3b1',
	'ionicon-android-textsms': '\uf3b2',
	'ionicon-android-time': '\uf3b3',
	'ionicon-android-train': '\uf3b4',
	'ionicon-android-unlock': '\uf3b5',
	'ionicon-android-upload': '\uf3b6',
	'ionicon-android-volume-down': '\uf3b7',
	'ionicon-android-volume-mute': '\uf3b8',
	'ionicon-android-volume-off': '\uf3b9',
	'ionicon-android-volume-up': '\uf3ba',
	'ionicon-android-walk': '\uf3bb',
	'ionicon-android-warning': '\uf3bc',
	'ionicon-android-watch': '\uf3bd',
	'ionicon-android-wifi': '\uf305',
	'ionicon-aperture': '\uf313',
	'ionicon-archive': '\uf102',
	'ionicon-arrow-down-a': '\uf103',
	'ionicon-arrow-down-b': '\uf104',
	'ionicon-arrow-down-c': '\uf105',
	'ionicon-arrow-expand': '\uf25e',
	'ionicon-arrow-graph-down-left': '\uf25f',
	'ionicon-arrow-graph-down-right': '\uf260',
	'ionicon-arrow-graph-up-left': '\uf261',
	'ionicon-arrow-graph-up-right': '\uf262',
	'ionicon-arrow-left-a': '\uf106',
	'ionicon-arrow-left-b': '\uf107',
	'ionicon-arrow-left-c': '\uf108',
	'ionicon-arrow-move': '\uf263',
	'ionicon-arrow-resize': '\uf264',
	'ionicon-arrow-return-left': '\uf265',
	'ionicon-arrow-return-right': '\uf266',
	'ionicon-arrow-right-a': '\uf109',
	'ionicon-arrow-right-b': '\uf10a',
	'ionicon-arrow-right-c': '\uf10b',
	'ionicon-arrow-shrink': '\uf267',
	'ionicon-arrow-swap': '\uf268',
	'ionicon-arrow-up-a': '\uf10c',
	'ionicon-arrow-up-b': '\uf10d',
	'ionicon-arrow-up-c': '\uf10e',
	'ionicon-asterisk': '\uf314',
	'ionicon-at': '\uf10f',
	'ionicon-backspace': '\uf3bf',
	'ionicon-backspace-outline': '\uf3be',
	'ionicon-bag': '\uf110',
	'ionicon-battery-charging': '\uf111',
	'ionicon-battery-empty': '\uf112',
	'ionicon-battery-full': '\uf113',
	'ionicon-battery-half': '\uf114',
	'ionicon-battery-low': '\uf115',
	'ionicon-beaker': '\uf269',
	'ionicon-beer': '\uf26a',
	'ionicon-bluetooth': '\uf116',
	'ionicon-bonfire': '\uf315',
	'ionicon-bookmark': '\uf26b',
	'ionicon-bowtie': '\uf3c0',
	'ionicon-briefcase': '\uf26c',
	'ionicon-bug': '\uf2be',
	'ionicon-calculator': '\uf26d',
	'ionicon-calendar': '\uf117',
	'ionicon-camera': '\uf118',
	'ionicon-card': '\uf119',
	'ionicon-cash': '\uf316',
	'ionicon-chatbox': '\uf11b',
	'ionicon-chatbox-working': '\uf11a',
	'ionicon-chatboxes': '\uf11c',
	'ionicon-chatbubble': '\uf11e',
	'ionicon-chatbubble-working': '\uf11d',
	'ionicon-chatbubbles': '\uf11f',
	'ionicon-checkmark': '\uf122',
	'ionicon-checkmark-circled': '\uf120',
	'ionicon-checkmark-round': '\uf121',
	'ionicon-chevron-down': '\uf123',
	'ionicon-chevron-left': '\uf124',
	'ionicon-chevron-right': '\uf125',
	'ionicon-chevron-up': '\uf126',
	'ionicon-clipboard': '\uf127',
	'ionicon-clock': '\uf26e',
	'ionicon-close': '\uf12a',
	'ionicon-close-circled': '\uf128',
	'ionicon-close-round': '\uf129',
	'ionicon-closed-captioning': '\uf317',
	'ionicon-cloud': '\uf12b',
	'ionicon-code': '\uf271',
	'ionicon-code-download': '\uf26f',
	'ionicon-code-working': '\uf270',
	'ionicon-coffee': '\uf272',
	'ionicon-compass': '\uf273',
	'ionicon-compose': '\uf12c',
	'ionicon-connection-bars': '\uf274',
	'ionicon-contrast': '\uf275',
	'ionicon-crop': '\uf3c1',
	'ionicon-cube': '\uf318',
	'ionicon-disc': '\uf12d',
	'ionicon-document': '\uf12f',
	'ionicon-document-text': '\uf12e',
	'ionicon-drag': '\uf130',
	'ionicon-earth': '\uf276',
	'ionicon-easel': '\uf3c2',
	'ionicon-edit': '\uf2bf',
	'ionicon-egg': '\uf277',
	'ionicon-eject': '\uf131',
	'ionicon-email': '\uf132',
	'ionicon-email-unread': '\uf3c3',
	'ionicon-erlenmeyer-flask': '\uf3c5',
	'ionicon-erlenmeyer-flask-bubbles': '\uf3c4',
	'ionicon-eye': '\uf133',
	'ionicon-eye-disabled': '\uf306',
	'ionicon-female': '\uf278',
	'ionicon-filing': '\uf134',
	'ionicon-film-marker': '\uf135',
	'ionicon-fireball': '\uf319',
	'ionicon-flag': '\uf279',
	'ionicon-flame': '\uf31a',
	'ionicon-flash': '\uf137',
	'ionicon-flash-off': '\uf136',
	'ionicon-folder': '\uf139',
	'ionicon-fork': '\uf27a',
	'ionicon-fork-repo': '\uf2c0',
	'ionicon-forward': '\uf13a',
	'ionicon-funnel': '\uf31b',
	'ionicon-gear-a': '\uf13d',
	'ionicon-gear-b': '\uf13e',
	'ionicon-grid': '\uf13f',
	'ionicon-hammer': '\uf27b',
	'ionicon-happy': '\uf31c',
	'ionicon-happy-outline': '\uf3c6',
	'ionicon-headphone': '\uf140',
	'ionicon-heart': '\uf141',
	'ionicon-heart-broken': '\uf31d',
	'ionicon-help': '\uf143',
	'ionicon-help-buoy': '\uf27c',
	'ionicon-help-circled': '\uf142',
	'ionicon-home': '\uf144',
	'ionicon-icecream': '\uf27d',
	'ionicon-image': '\uf147',
	'ionicon-images': '\uf148',
	'ionicon-information': '\uf14a',
	'ionicon-information-circled': '\uf149',
	'ionicon-ionic': '\uf14b',
	'ionicon-ios-alarm': '\uf3c8',
	'ionicon-ios-alarm-outline': '\uf3c7',
	'ionicon-ios-albums': '\uf3ca',
	'ionicon-ios-albums-outline': '\uf3c9',
	'ionicon-ios-americanfootball': '\uf3cc',
	'ionicon-ios-americanfootball-outline': '\uf3cb',
	'ionicon-ios-analytics': '\uf3ce',
	'ionicon-ios-analytics-outline': '\uf3cd',
	'ionicon-ios-arrow-back': '\uf3cf',
	'ionicon-ios-arrow-down': '\uf3d0',
	'ionicon-ios-arrow-forward': '\uf3d1',
	'ionicon-ios-arrow-left': '\uf3d2',
	'ionicon-ios-arrow-right': '\uf3d3',
	'ionicon-ios-arrow-thin-down': '\uf3d4',
	'ionicon-ios-arrow-thin-left': '\uf3d5',
	'ionicon-ios-arrow-thin-right': '\uf3d6',
	'ionicon-ios-arrow-thin-up': '\uf3d7',
	'ionicon-ios-arrow-up': '\uf3d8',
	'ionicon-ios-at': '\uf3da',
	'ionicon-ios-at-outline': '\uf3d9',
	'ionicon-ios-barcode': '\uf3dc',
	'ionicon-ios-barcode-outline': '\uf3db',
	'ionicon-ios-baseball': '\uf3de',
	'ionicon-ios-baseball-outline': '\uf3dd',
	'ionicon-ios-basketball': '\uf3e0',
	'ionicon-ios-basketball-outline': '\uf3df',
	'ionicon-ios-bell': '\uf3e2',
	'ionicon-ios-bell-outline': '\uf3e1',
	'ionicon-ios-body': '\uf3e4',
	'ionicon-ios-body-outline': '\uf3e3',
	'ionicon-ios-bolt': '\uf3e6',
	'ionicon-ios-bolt-outline': '\uf3e5',
	'ionicon-ios-book': '\uf3e8',
	'ionicon-ios-book-outline': '\uf3e7',
	'ionicon-ios-bookmarks': '\uf3ea',
	'ionicon-ios-bookmarks-outline': '\uf3e9',
	'ionicon-ios-box': '\uf3ec',
	'ionicon-ios-box-outline': '\uf3eb',
	'ionicon-ios-briefcase': '\uf3ee',
	'ionicon-ios-briefcase-outline': '\uf3ed',
	'ionicon-ios-browsers': '\uf3f0',
	'ionicon-ios-browsers-outline': '\uf3ef',
	'ionicon-ios-calculator': '\uf3f2',
	'ionicon-ios-calculator-outline': '\uf3f1',
	'ionicon-ios-calendar': '\uf3f4',
	'ionicon-ios-calendar-outline': '\uf3f3',
	'ionicon-ios-camera': '\uf3f6',
	'ionicon-ios-camera-outline': '\uf3f5',
	'ionicon-ios-cart': '\uf3f8',
	'ionicon-ios-cart-outline': '\uf3f7',
	'ionicon-ios-chatboxes': '\uf3fa',
	'ionicon-ios-chatboxes-outline': '\uf3f9',
	'ionicon-ios-chatbubble': '\uf3fc',
	'ionicon-ios-chatbubble-outline': '\uf3fb',
	'ionicon-ios-checkmark': '\uf3ff',
	'ionicon-ios-checkmark-empty': '\uf3fd',
	'ionicon-ios-checkmark-outline': '\uf3fe',
	'ionicon-ios-circle-filled': '\uf400',
	'ionicon-ios-circle-outline': '\uf401',
	'ionicon-ios-clock': '\uf403',
	'ionicon-ios-clock-outline': '\uf402',
	'ionicon-ios-close': '\uf406',
	'ionicon-ios-close-empty': '\uf404',
	'ionicon-ios-close-outline': '\uf405',
	'ionicon-ios-cloud': '\uf40c',
	'ionicon-ios-cloud-download': '\uf408',
	'ionicon-ios-cloud-download-outline': '\uf407',
	'ionicon-ios-cloud-outline': '\uf409',
	'ionicon-ios-cloud-upload': '\uf40b',
	'ionicon-ios-cloud-upload-outline': '\uf40a',
	'ionicon-ios-cloudy': '\uf410',
	'ionicon-ios-cloudy-night': '\uf40e',
	'ionicon-ios-cloudy-night-outline': '\uf40d',
	'ionicon-ios-cloudy-outline': '\uf40f',
	'ionicon-ios-cog': '\uf412',
	'ionicon-ios-cog-outline': '\uf411',
	'ionicon-ios-color-filter': '\uf414',
	'ionicon-ios-color-filter-outline': '\uf413',
	'ionicon-ios-color-wand': '\uf416',
	'ionicon-ios-color-wand-outline': '\uf415',
	'ionicon-ios-compose': '\uf418',
	'ionicon-ios-compose-outline': '\uf417',
	'ionicon-ios-contact': '\uf41a',
	'ionicon-ios-contact-outline': '\uf419',
	'ionicon-ios-copy': '\uf41c',
	'ionicon-ios-copy-outline': '\uf41b',
	'ionicon-ios-crop': '\uf41e',
	'ionicon-ios-crop-strong': '\uf41d',
	'ionicon-ios-download': '\uf420',
	'ionicon-ios-download-outline': '\uf41f',
	'ionicon-ios-drag': '\uf421',
	'ionicon-ios-email': '\uf423',
	'ionicon-ios-email-outline': '\uf422',
	'ionicon-ios-eye': '\uf425',
	'ionicon-ios-eye-outline': '\uf424',
	'ionicon-ios-fastforward': '\uf427',
	'ionicon-ios-fastforward-outline': '\uf426',
	'ionicon-ios-filing': '\uf429',
	'ionicon-ios-filing-outline': '\uf428',
	'ionicon-ios-film': '\uf42b',
	'ionicon-ios-film-outline': '\uf42a',
	'ionicon-ios-flag': '\uf42d',
	'ionicon-ios-flag-outline': '\uf42c',
	'ionicon-ios-flame': '\uf42f',
	'ionicon-ios-flame-outline': '\uf42e',
	'ionicon-ios-flask': '\uf431',
	'ionicon-ios-flask-outline': '\uf430',
	'ionicon-ios-flower': '\uf433',
	'ionicon-ios-flower-outline': '\uf432',
	'ionicon-ios-folder': '\uf435',
	'ionicon-ios-folder-outline': '\uf434',
	'ionicon-ios-football': '\uf437',
	'ionicon-ios-football-outline': '\uf436',
	'ionicon-ios-game-controller-a': '\uf439',
	'ionicon-ios-game-controller-a-outline': '\uf438',
	'ionicon-ios-game-controller-b': '\uf43b',
	'ionicon-ios-game-controller-b-outline': '\uf43a',
	'ionicon-ios-gear': '\uf43d',
	'ionicon-ios-gear-outline': '\uf43c',
	'ionicon-ios-glasses': '\uf43f',
	'ionicon-ios-glasses-outline': '\uf43e',
	'ionicon-ios-grid-view': '\uf441',
	'ionicon-ios-grid-view-outline': '\uf440',
	'ionicon-ios-heart': '\uf443',
	'ionicon-ios-heart-outline': '\uf442',
	'ionicon-ios-help': '\uf446',
	'ionicon-ios-help-empty': '\uf444',
	'ionicon-ios-help-outline': '\uf445',
	'ionicon-ios-home': '\uf448',
	'ionicon-ios-home-outline': '\uf447',
	'ionicon-ios-infinite': '\uf44a',
	'ionicon-ios-infinite-outline': '\uf449',
	'ionicon-ios-information': '\uf44d',
	'ionicon-ios-information-empty': '\uf44b',
	'ionicon-ios-information-outline': '\uf44c',
	'ionicon-ios-ionic-outline': '\uf44e',
	'ionicon-ios-keypad': '\uf450',
	'ionicon-ios-keypad-outline': '\uf44f',
	'ionicon-ios-lightbulb': '\uf452',
	'ionicon-ios-lightbulb-outline': '\uf451',
	'ionicon-ios-list': '\uf454',
	'ionicon-ios-list-outline': '\uf453',
	'ionicon-ios-location': '\uf456',
	'ionicon-ios-location-outline': '\uf455',
	'ionicon-ios-locked': '\uf458',
	'ionicon-ios-locked-outline': '\uf457',
	'ionicon-ios-loop': '\uf45a',
	'ionicon-ios-loop-strong': '\uf459',
	'ionicon-ios-medical': '\uf45c',
	'ionicon-ios-medical-outline': '\uf45b',
	'ionicon-ios-medkit': '\uf45e',
	'ionicon-ios-medkit-outline': '\uf45d',
	'ionicon-ios-mic': '\uf461',
	'ionicon-ios-mic-off': '\uf45f',
	'ionicon-ios-mic-outline': '\uf460',
	'ionicon-ios-minus': '\uf464',
	'ionicon-ios-minus-empty': '\uf462',
	'ionicon-ios-minus-outline': '\uf463',
	'ionicon-ios-monitor': '\uf466',
	'ionicon-ios-monitor-outline': '\uf465',
	'ionicon-ios-moon': '\uf468',
	'ionicon-ios-moon-outline': '\uf467',
	'ionicon-ios-more': '\uf46a',
	'ionicon-ios-more-outline': '\uf469',
	'ionicon-ios-musical-note': '\uf46b',
	'ionicon-ios-musical-notes': '\uf46c',
	'ionicon-ios-navigate': '\uf46e',
	'ionicon-ios-navigate-outline': '\uf46d',
	'ionicon-ios-nutrition': '\uf470',
	'ionicon-ios-nutrition-outline': '\uf46f',
	'ionicon-ios-paper': '\uf472',
	'ionicon-ios-paper-outline': '\uf471',
	'ionicon-ios-paperplane': '\uf474',
	'ionicon-ios-paperplane-outline': '\uf473',
	'ionicon-ios-partlysunny': '\uf476',
	'ionicon-ios-partlysunny-outline': '\uf475',
	'ionicon-ios-pause': '\uf478',
	'ionicon-ios-pause-outline': '\uf477',
	'ionicon-ios-paw': '\uf47a',
	'ionicon-ios-paw-outline': '\uf479',
	'ionicon-ios-people': '\uf47c',
	'ionicon-ios-people-outline': '\uf47b',
	'ionicon-ios-person': '\uf47e',
	'ionicon-ios-person-outline': '\uf47d',
	'ionicon-ios-personadd': '\uf480',
	'ionicon-ios-personadd-outline': '\uf47f',
	'ionicon-ios-photos': '\uf482',
	'ionicon-ios-photos-outline': '\uf481',
	'ionicon-ios-pie': '\uf484',
	'ionicon-ios-pie-outline': '\uf483',
	'ionicon-ios-pint': '\uf486',
	'ionicon-ios-pint-outline': '\uf485',
	'ionicon-ios-play': '\uf488',
	'ionicon-ios-play-outline': '\uf487',
	'ionicon-ios-plus': '\uf48b',
	'ionicon-ios-plus-empty': '\uf489',
	'ionicon-ios-plus-outline': '\uf48a',
	'ionicon-ios-pricetag': '\uf48d',
	'ionicon-ios-pricetag-outline': '\uf48c',
	'ionicon-ios-pricetags': '\uf48f',
	'ionicon-ios-pricetags-outline': '\uf48e',
	'ionicon-ios-printer': '\uf491',
	'ionicon-ios-printer-outline': '\uf490',
	'ionicon-ios-pulse': '\uf493',
	'ionicon-ios-pulse-strong': '\uf492',
	'ionicon-ios-rainy': '\uf495',
	'ionicon-ios-rainy-outline': '\uf494',
	'ionicon-ios-recording': '\uf497',
	'ionicon-ios-recording-outline': '\uf496',
	'ionicon-ios-redo': '\uf499',
	'ionicon-ios-redo-outline': '\uf498',
	'ionicon-ios-refresh': '\uf49c',
	'ionicon-ios-refresh-empty': '\uf49a',
	'ionicon-ios-refresh-outline': '\uf49b',
	'ionicon-ios-reload': '\uf49d',
	'ionicon-ios-reverse-camera': '\uf49f',
	'ionicon-ios-reverse-camera-outline': '\uf49e',
	'ionicon-ios-rewind': '\uf4a1',
	'ionicon-ios-rewind-outline': '\uf4a0',
	'ionicon-ios-rose': '\uf4a3',
	'ionicon-ios-rose-outline': '\uf4a2',
	'ionicon-ios-search': '\uf4a5',
	'ionicon-ios-search-strong': '\uf4a4',
	'ionicon-ios-settings': '\uf4a7',
	'ionicon-ios-settings-strong': '\uf4a6',
	'ionicon-ios-shuffle': '\uf4a9',
	'ionicon-ios-shuffle-strong': '\uf4a8',
	'ionicon-ios-skipbackward': '\uf4ab',
	'ionicon-ios-skipbackward-outline': '\uf4aa',
	'ionicon-ios-skipforward': '\uf4ad',
	'ionicon-ios-skipforward-outline': '\uf4ac',
	'ionicon-ios-snowy': '\uf4ae',
	'ionicon-ios-speedometer': '\uf4b0',
	'ionicon-ios-speedometer-outline': '\uf4af',
	'ionicon-ios-star': '\uf4b3',
	'ionicon-ios-star-half': '\uf4b1',
	'ionicon-ios-star-outline': '\uf4b2',
	'ionicon-ios-stopwatch': '\uf4b5',
	'ionicon-ios-stopwatch-outline': '\uf4b4',
	'ionicon-ios-sunny': '\uf4b7',
	'ionicon-ios-sunny-outline': '\uf4b6',
	'ionicon-ios-telephone': '\uf4b9',
	'ionicon-ios-telephone-outline': '\uf4b8',
	'ionicon-ios-tennisball': '\uf4bb',
	'ionicon-ios-tennisball-outline': '\uf4ba',
	'ionicon-ios-thunderstorm': '\uf4bd',
	'ionicon-ios-thunderstorm-outline': '\uf4bc',
	'ionicon-ios-time': '\uf4bf',
	'ionicon-ios-time-outline': '\uf4be',
	'ionicon-ios-timer': '\uf4c1',
	'ionicon-ios-timer-outline': '\uf4c0',
	'ionicon-ios-toggle': '\uf4c3',
	'ionicon-ios-toggle-outline': '\uf4c2',
	'ionicon-ios-trash': '\uf4c5',
	'ionicon-ios-trash-outline': '\uf4c4',
	'ionicon-ios-undo': '\uf4c7',
	'ionicon-ios-undo-outline': '\uf4c6',
	'ionicon-ios-unlocked': '\uf4c9',
	'ionicon-ios-unlocked-outline': '\uf4c8',
	'ionicon-ios-upload': '\uf4cb',
	'ionicon-ios-upload-outline': '\uf4ca',
	'ionicon-ios-videocam': '\uf4cd',
	'ionicon-ios-videocam-outline': '\uf4cc',
	'ionicon-ios-volume-high': '\uf4ce',
	'ionicon-ios-volume-low': '\uf4cf',
	'ionicon-ios-wineglass': '\uf4d1',
	'ionicon-ios-wineglass-outline': '\uf4d0',
	'ionicon-ios-world': '\uf4d3',
	'ionicon-ios-world-outline': '\uf4d2',
	'ionicon-ipad': '\uf1f9',
	'ionicon-iphone': '\uf1fa',
	'ionicon-ipod': '\uf1fb',
	'ionicon-jet': '\uf295',
	'ionicon-key': '\uf296',
	'ionicon-knife': '\uf297',
	'ionicon-laptop': '\uf1fc',
	'ionicon-leaf': '\uf1fd',
	'ionicon-levels': '\uf298',
	'ionicon-lightbulb': '\uf299',
	'ionicon-link': '\uf1fe',
	'ionicon-load-a': '\uf29a',
	'ionicon-load-b': '\uf29b',
	'ionicon-load-c': '\uf29c',
	'ionicon-load-d': '\uf29d',
	'ionicon-location': '\uf1ff',
	'ionicon-lock-combination': '\uf4d4',
	'ionicon-locked': '\uf200',
	'ionicon-log-in': '\uf29e',
	'ionicon-log-out': '\uf29f',
	'ionicon-loop': '\uf201',
	'ionicon-magnet': '\uf2a0',
	'ionicon-male': '\uf2a1',
	'ionicon-man': '\uf202',
	'ionicon-map': '\uf203',
	'ionicon-medkit': '\uf2a2',
	'ionicon-merge': '\uf33f',
	'ionicon-mic-a': '\uf204',
	'ionicon-mic-b': '\uf205',
	'ionicon-mic-c': '\uf206',
	'ionicon-minus': '\uf209',
	'ionicon-minus-circled': '\uf207',
	'ionicon-minus-round': '\uf208',
	'ionicon-model-s': '\uf2c1',
	'ionicon-monitor': '\uf20a',
	'ionicon-more': '\uf20b',
	'ionicon-mouse': '\uf340',
	'ionicon-music-note': '\uf20c',
	'ionicon-navicon': '\uf20e',
	'ionicon-navicon-round': '\uf20d',
	'ionicon-navigate': '\uf2a3',
	'ionicon-network': '\uf341',
	'ionicon-no-smoking': '\uf2c2',
	'ionicon-nuclear': '\uf2a4',
	'ionicon-outlet': '\uf342',
	'ionicon-paintbrush': '\uf4d5',
	'ionicon-paintbucket': '\uf4d6',
	'ionicon-paper-airplane': '\uf2c3',
	'ionicon-paperclip': '\uf20f',
	'ionicon-pause': '\uf210',
	'ionicon-person': '\uf213',
	'ionicon-person-add': '\uf211',
	'ionicon-person-stalker': '\uf212',
	'ionicon-pie-graph': '\uf2a5',
	'ionicon-pin': '\uf2a6',
	'ionicon-pinpoint': '\uf2a7',
	'ionicon-pizza': '\uf2a8',
	'ionicon-plane': '\uf214',
	'ionicon-planet': '\uf343',
	'ionicon-play': '\uf215',
	'ionicon-playstation': '\uf30a',
	'ionicon-plus': '\uf218',
	'ionicon-plus-circled': '\uf216',
	'ionicon-plus-round': '\uf217',
	'ionicon-podium': '\uf344',
	'ionicon-pound': '\uf219',
	'ionicon-power': '\uf2a9',
	'ionicon-pricetag': '\uf2aa',
	'ionicon-pricetags': '\uf2ab',
	'ionicon-printer': '\uf21a',
	'ionicon-pull-request': '\uf345',
	'ionicon-qr-scanner': '\uf346',
	'ionicon-quote': '\uf347',
	'ionicon-radio-waves': '\uf2ac',
	'ionicon-record': '\uf21b',
	'ionicon-refresh': '\uf21c',
	'ionicon-reply': '\uf21e',
	'ionicon-reply-all': '\uf21d',
	'ionicon-ribbon-a': '\uf348',
	'ionicon-ribbon-b': '\uf349',
	'ionicon-sad': '\uf34a',
	'ionicon-sad-outline': '\uf4d7',
	'ionicon-scissors': '\uf34b',
	'ionicon-search': '\uf21f',
	'ionicon-settings': '\uf2ad',
	'ionicon-share': '\uf220',
	'ionicon-shuffle': '\uf221',
	'ionicon-skip-backward': '\uf222',
	'ionicon-skip-forward': '\uf223',
	'ionicon-social-android': '\uf225',
	'ionicon-social-android-outline': '\uf224',
	'ionicon-social-angular': '\uf4d9',
	'ionicon-social-angular-outline': '\uf4d8',
	'ionicon-social-apple': '\uf227',
	'ionicon-social-apple-outline': '\uf226',
	'ionicon-social-bitcoin': '\uf2af',
	'ionicon-social-bitcoin-outline': '\uf2ae',
	'ionicon-social-buffer': '\uf229',
	'ionicon-social-buffer-outline': '\uf228',
	'ionicon-social-chrome': '\uf4db',
	'ionicon-social-chrome-outline': '\uf4da',
	'ionicon-social-codepen': '\uf4dd',
	'ionicon-social-codepen-outline': '\uf4dc',
	'ionicon-social-css3': '\uf4df',
	'ionicon-social-css3-outline': '\uf4de',
	'ionicon-social-designernews': '\uf22b',
	'ionicon-social-designernews-outline': '\uf22a',
	'ionicon-social-dribbble': '\uf22d',
	'ionicon-social-dribbble-outline': '\uf22c',
	'ionicon-social-dropbox': '\uf22f',
	'ionicon-social-dropbox-outline': '\uf22e',
	'ionicon-social-euro': '\uf4e1',
	'ionicon-social-euro-outline': '\uf4e0',
	'ionicon-social-facebook': '\uf231',
	'ionicon-social-facebook-outline': '\uf230',
	'ionicon-social-foursquare': '\uf34d',
	'ionicon-social-foursquare-outline': '\uf34c',
	'ionicon-social-freebsd-devil': '\uf2c4',
	'ionicon-social-github': '\uf233',
	'ionicon-social-github-outline': '\uf232',
	'ionicon-social-google': '\uf34f',
	'ionicon-social-google-outline': '\uf34e',
	'ionicon-social-googleplus': '\uf235',
	'ionicon-social-googleplus-outline': '\uf234',
	'ionicon-social-hackernews': '\uf237',
	'ionicon-social-hackernews-outline': '\uf236',
	'ionicon-social-html5': '\uf4e3',
	'ionicon-social-html5-outline': '\uf4e2',
	'ionicon-social-instagram': '\uf351',
	'ionicon-social-instagram-outline': '\uf350',
	'ionicon-social-javascript': '\uf4e5',
	'ionicon-social-javascript-outline': '\uf4e4',
	'ionicon-social-linkedin': '\uf239',
	'ionicon-social-linkedin-outline': '\uf238',
	'ionicon-social-markdown': '\uf4e6',
	'ionicon-social-nodejs': '\uf4e7',
	'ionicon-social-octocat': '\uf4e8',
	'ionicon-social-pinterest': '\uf2b1',
	'ionicon-social-pinterest-outline': '\uf2b0',
	'ionicon-social-python': '\uf4e9',
	'ionicon-social-reddit': '\uf23b',
	'ionicon-social-reddit-outline': '\uf23a',
	'ionicon-social-rss': '\uf23d',
	'ionicon-social-rss-outline': '\uf23c',
	'ionicon-social-sass': '\uf4ea',
	'ionicon-social-skype': '\uf23f',
	'ionicon-social-skype-outline': '\uf23e',
	'ionicon-social-snapchat': '\uf4ec',
	'ionicon-social-snapchat-outline': '\uf4eb',
	'ionicon-social-tumblr': '\uf241',
	'ionicon-social-tumblr-outline': '\uf240',
	'ionicon-social-tux': '\uf2c5',
	'ionicon-social-twitch': '\uf4ee',
	'ionicon-social-twitch-outline': '\uf4ed',
	'ionicon-social-twitter': '\uf243',
	'ionicon-social-twitter-outline': '\uf242',
	'ionicon-social-usd': '\uf353',
	'ionicon-social-usd-outline': '\uf352',
	'ionicon-social-vimeo': '\uf245',
	'ionicon-social-vimeo-outline': '\uf244',
	'ionicon-social-whatsapp': '\uf4f0',
	'ionicon-social-whatsapp-outline': '\uf4ef',
	'ionicon-social-windows': '\uf247',
	'ionicon-social-windows-outline': '\uf246',
	'ionicon-social-wordpress': '\uf249',
	'ionicon-social-wordpress-outline': '\uf248',
	'ionicon-social-yahoo': '\uf24b',
	'ionicon-social-yahoo-outline': '\uf24a',
	'ionicon-social-yen': '\uf4f2',
	'ionicon-social-yen-outline': '\uf4f1',
	'ionicon-social-youtube': '\uf24d',
	'ionicon-social-youtube-outline': '\uf24c',
	'ionicon-soup-can': '\uf4f4',
	'ionicon-soup-can-outline': '\uf4f3',
	'ionicon-speakerphone': '\uf2b2',
	'ionicon-speedometer': '\uf2b3',
	'ionicon-spoon': '\uf2b4',
	'ionicon-star': '\uf24e',
	'ionicon-stats-bars': '\uf2b5',
	'ionicon-steam': '\uf30b',
	'ionicon-stop': '\uf24f',
	'ionicon-thermometer': '\uf2b6',
	'ionicon-thumbsdown': '\uf250',
	'ionicon-thumbsup': '\uf251',
	'ionicon-toggle': '\uf355',
	'ionicon-toggle-filled': '\uf354',
	'ionicon-transgender': '\uf4f5',
	'ionicon-trash-a': '\uf252',
	'ionicon-trash-b': '\uf253',
	'ionicon-trophy': '\uf356',
	'ionicon-tshirt': '\uf4f7',
	'ionicon-tshirt-outline': '\uf4f6',
	'ionicon-umbrella': '\uf2b7',
	'ionicon-university': '\uf357',
	'ionicon-unlocked': '\uf254',
	'ionicon-upload': '\uf255',
	'ionicon-usb': '\uf2b8',
	'ionicon-videocamera': '\uf256',
	'ionicon-volume-high': '\uf257',
	'ionicon-volume-low': '\uf258',
	'ionicon-volume-medium': '\uf259',
	'ionicon-volume-mute': '\uf25a',
	'ionicon-wand': '\uf358',
	'ionicon-waterdrop': '\uf25b',
	'ionicon-wifi': '\uf25c',
	'ionicon-wineglass': '\uf2b9',
	'ionicon-woman': '\uf25d',
	'ionicon-wrench': '\uf2ba',
	'ionicon-xbox': '\uf30c',
}

export default class Icon extends Component {
	static propTypes = {
		className: PropTypes.string,
		name: function(props, propName) {
			if (!props[propName]) {
				return new Error('`name` is required')
			}
			if (!icons.hasOwnProperty(props[propName])) {
				return new Error('Invalid icon')
			}
		},
		type: PropTypes.oneOf(['block', 'inline']).isRequired,
	}

	static defaultProps = {
		type: 'inline',
	}

	render() {
		const style = {display: this.props.type === 'inline' ? 'inline-block' : 'block'}
		return (
			<span
				className={cx('icon', this.props.className)}
				style={style}>
				{icons[this.props.name]}
			</span>
		)
	}
}
