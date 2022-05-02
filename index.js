import { transpose , note } from '@tonaljs/tonal';
import { chord } from '@tonaljs/chord';
import { entries } from '@tonaljs/chord-dictionary';
import { Howler, howl } from 'howler';
import 'custom-piano-keys';

var AudioSynth = require('audiosynth');
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var synth = new AudioSynth(context);
var metronome = new AudioSynth(context);
var amplitude = 0.25;
var shiftOctave = 0;

metronome.setOscWave(0);
// Set filter attack time
metronome.setAmpAttackTime(0);
// Increase amplitude release time
metronome.setAmpReleaseTime(0.01);

synth.setOscWave(0);
/*
// Turn up stereo delay
synth.setDelayFeedback(0.5); 

// Set delay time to tempo
synth.setDelayTimeTempo(90, 0.25);
*/
// Set filter cuttoff
synth.setFilterCutoff(1);

// Set filter envelope modulation amount
synth.setFilterEnvMod(0);
synth.setMasterGain(1);

let attackSelector = document.querySelector('#attack');
let releaseSelector = document.querySelector('#release');
let cutoffSelector = document.querySelector('#cutoff');
let waveSelector = document.querySelector('#wave');
let attack = 0;
let release = 0;

// Set filter attack time
synth.setAmpAttackTime(0);
// Increase amplitude release time
synth.setAmpReleaseTime(0.25);



const browserFs = require('browser-fs-access');

const MidiWriter = require('midi-writer-js');

/*
var pianokeys = document.createElement("custom-piano-keys")
pianokeys.setAttribute("oct-count", "5")
pianokeys.setAttribute("height", "101.25")
pianokeys.setAttribute("stroke-w", "1")
pianokeys.setAttribute("mark-color", "black")
pianokeys.setAttribute("mark-diameter", "75")
pianokeys.setAttribute("b-key-h", "50")
pianokeys.setAttribute("mark-shape", "rect")
element = document.getElementById("div1");
element.insertBefore(pianokeys, element.firstChild);
*/

let track = new MidiWriter.Track();

let write = new MidiWriter.Writer(track);

/*
const MidiWriter = require('midi-writer-js');

// Start with a new track
const track = new MidiWriter.Track();

// Define an instrument (optional):
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

// Add some notes:
const note = new MidiWriter.NoteEvent({pitch: ['C4', 'D4', 'E4'], duration: '4'});
track.addEvent(note);

// Generate a data URI
const write = new MidiWriter.Writer(track);
console.log(write.buildData());
var data = write.buildData();

const options = {
    // Suggested file name to use, defaults to `''`.
    fileName: 'Test.json',
    // Suggested file extensions (with leading '.'), defaults to `''`.
    extensions: ['.json']
  };

blob = new Blob(data);

browserFs.fileSave(blob, options);
*/

let startTime;

const startNotes = [-24, -23, -22, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; 
const startChords = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; 
const startTypes = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]; 

const firstTypeSelector = document.querySelector('#first-type');
const secondTypeSelector = document.querySelector('#second-type');
const thirdTypeSelector = document.querySelector('#third-type');
const fourthTypeSelector = document.querySelector('#fourth-type');
const buttons = document.querySelector('.buttons');
const intervalsInChord = document.querySelector('.intervals-in-chord');
const notesInChord = document.querySelector('.notes-in-chord');
const recordButtonSelector = document.querySelector('#record-button');
const downloadButtonSelector = document.querySelector('#download-button');

let selectedStartNote = 'C';
let selectedOctave = '1';
let selectedChord;

let key = 0;
let zeroChordRoot = 0;
let firstChordRoot = 0;
let secondChordRoot = 0;
let thirdChordRoot = 0;

let chordRoots = [zeroChordRoot, firstChordRoot, secondChordRoot, thirdChordRoot];

let doubler12 = 0;
let doubler13 = 0;
let doubler14 = 0;
let doubler15 = 0;
let doubler16 = 0;
let doubler17 = 0;
let doubler18 = 0;

let doubleUpwards1 = false;
let doubleUpwards2 = false;
let doubleUpwards3 = false;
let doubleUpwards4 = false;
let doubleUpwards5 = false;
let doubleUpwards6 = false;
let doubleUpwards7 = false;
let doubleUpwards8 = false;

let rootDoubler1 = 0;
let rootDoubler2 = 0;
let rootDoubler3 = 0;
let rootDoubler4 = 0;

let octaveTranspose1 = 0;
let octaveTranspose2 = 0;
let octaveTranspose3 = 0;
let octaveTranspose4 = 0;

let octaveMultiplier1 = 0;
let octaveMultiplier2 = 0;
let octaveMultiplier3 = 0;
let octaveMultiplier4 = 0;
let octaveMultiplier5 = 0;
let octaveMultiplier6 = 0;
let octaveMultiplier7 = 0;
let octaveMultiplier8 = 0;

let octaveMultiplier9 = 0;
let octaveMultiplier10 = 0;
let octaveMultiplier11 = 0;
let octaveMultiplier12 = 0;
let octaveMultiplier13 = 0;
let octaveMultiplier14 = 0;
let octaveMultiplier15 = 0;
let octaveMultiplier16 = 0;

let octaveMultiplier17 = 0;
let octaveMultiplier18 = 0;
let octaveMultiplier19 = 0;
let octaveMultiplier20 = 0;
let octaveMultiplier21 = 0;
let octaveMultiplier22 = 0;
let octaveMultiplier23 = 0;
let octaveMultiplier24 = 0;

let octaveMultiplier25 = 0;
let octaveMultiplier26 = 0;
let octaveMultiplier27 = 0;
let octaveMultiplier28 = 0;
let octaveMultiplier29 = 0;
let octaveMultiplier30 = 0;
let octaveMultiplier31 = 0;
let octaveMultiplier32 = 0;

let octaveMultipliers = [octaveMultiplier1, octaveMultiplier2, octaveMultiplier3, octaveMultiplier4, octaveMultiplier5, octaveMultiplier6, octaveMultiplier7, octaveMultiplier8, octaveMultiplier9, octaveMultiplier10, octaveMultiplier11, octaveMultiplier12, octaveMultiplier13, octaveMultiplier14, octaveMultiplier15, octaveMultiplier16, octaveMultiplier17, octaveMultiplier18, octaveMultiplier19, octaveMultiplier20, octaveMultiplier21, octaveMultiplier22, octaveMultiplier23, octaveMultiplier24, octaveMultiplier25, octaveMultiplier26, octaveMultiplier27, octaveMultiplier28, octaveMultiplier29, octaveMultiplier30, octaveMultiplier31, octaveMultiplier32];

let semitoneOffset1 = 0;
let semitoneOffset2 = 0;
let semitoneOffset3 = 0;
let semitoneOffset4 = 0;
let semitoneOffset5 = 0;
let semitoneOffset6 = 0;
let semitoneOffset7 = 0;
let semitoneOffset8 = 0;

let semitoneOffset9 = 0;
let semitoneOffset10 = 0;
let semitoneOffset11 = 0;
let semitoneOffset12 = 0;
let semitoneOffset13 = 0;
let semitoneOffset14 = 0;
let semitoneOffset15 = 0;
let semitoneOffset16 = 0;

let semitoneOffset17 = 0;
let semitoneOffset18 = 0;
let semitoneOffset19 = 0;
let semitoneOffset20 = 0;
let semitoneOffset21 = 0;
let semitoneOffset22 = 0;
let semitoneOffset23 = 0;
let semitoneOffset24 = 0;

let semitoneOffset25 = 0;
let semitoneOffset26 = 0;
let semitoneOffset27 = 0;
let semitoneOffset28 = 0;
let semitoneOffset29 = 0;
let semitoneOffset30 = 0;
let semitoneOffset31 = 0;
let semitoneOffset32 = 0;

let semitoneOffsets = [semitoneOffset1, semitoneOffset2, semitoneOffset3, semitoneOffset4, semitoneOffset5, semitoneOffset6, semitoneOffset7, semitoneOffset8, semitoneOffset9, semitoneOffset10, semitoneOffset11, semitoneOffset12, semitoneOffset13, semitoneOffset14, semitoneOffset15, semitoneOffset16, semitoneOffset17, semitoneOffset18, semitoneOffset19, semitoneOffset20, semitoneOffset21, semitoneOffset22, semitoneOffset23, semitoneOffset24, semitoneOffset25, semitoneOffset26, semitoneOffset27, semitoneOffset28, semitoneOffset29, semitoneOffset30, semitoneOffset31, semitoneOffset32]

let zeroChordMinorOffset = 0;
let firstChordMinorOffset = 0;
let secondChordMinorOffset = 0;
let thirdChordMinorOffset = 0;

let recording = false;

var tickInterval;
var metronomeInterval;
var waitTime = 0;
var writableNotes = [];
var lastNoteString;
let counter = 0;
let tickAmt = 0;
let pressedFirstNote = false;

let markedKeys = [];

let noteIds = new Array(100);
let pressedNotes = [];
for(i = 0; i < 100; i++) pressedNotes.push(false);

const include1Selector = document.querySelector('#inc-1');
const include2Selector  = document.querySelector('#inc-2');
const include3Selector  = document.querySelector('#inc-3');
const include4Selector  = document.querySelector('#inc-4');
const include5Selector  = document.querySelector('#inc-5');
const include6Selector  = document.querySelector('#inc-6');
const include7Selector  = document.querySelector('#inc-7');
const include8Selector  = document.querySelector('#inc-8');

const include9Selector = document.querySelector('#inc-9');
const include10Selector  = document.querySelector('#inc-10');
const include11Selector  = document.querySelector('#inc-11');
const include12Selector  = document.querySelector('#inc-12');
const include13Selector  = document.querySelector('#inc-13');
const include14Selector  = document.querySelector('#inc-14');
const include15Selector  = document.querySelector('#inc-15');
const include16Selector  = document.querySelector('#inc-16');

const include17Selector = document.querySelector('#inc-17');
const include18Selector  = document.querySelector('#inc-18');
const include19Selector  = document.querySelector('#inc-19');
const include20Selector  = document.querySelector('#inc-20');
const include21Selector  = document.querySelector('#inc-21');
const include22Selector  = document.querySelector('#inc-22');
const include23Selector  = document.querySelector('#inc-23');
const include24Selector  = document.querySelector('#inc-24');

let include1 = true;
let include2 = true;
let include3 = true;
let include4 = true;
let include5 = false;
let include6 = false;
let include7 = false;
let include8 = false;

let include9 = true;
let include10 = true;
let include11 = true;
let include12 = true;
let include13 = false;
let include14 = false;
let include15 = false;
let include16 = false;

let include17 = true;
let include18 = true;
let include19 = true;
let include20 = true;
let include21 = false;
let include22 = false;
let include23 = false;
let include24 = false;

let include25 = true;
let include26 = true;
let include27 = true;
let include28 = true;
let include29 = true;
let include30 = true;
let include31 = true;
let include32 = true;

const sustainSelector = document.querySelector('#sustain');
const tempoSelector = document.querySelector('#tempo');
let sustainOn = true;
let dataUri;
let tempo = 90;

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

const app = {
    init() {
        /*
        var track = [];
        var write = new MidiWriter.Writer(track);
        var buffer = new Buffer(write.buildFile());
        fs.writeFile('my-midi-file.mid', buffer, function (err) {
            if(err) throw err;
        });
        */
        this.setupEventListeners();
        startTime = Date.now();
        this.createPitchTable(document.getElementById('pitch-table-1'), 1)
        this.createPitchTable(document.getElementById('pitch-table-2'), 2)
        this.createPitchTable(document.getElementById('pitch-table-3'), 3)
        this.createPitchTable(document.getElementById('pitch-table-4'), 4)
        this.addClickListenersToPitchTable(1);
        this.addClickListenersToPitchTable(2);
        this.addClickListenersToPitchTable(3);
        this.addClickListenersToPitchTable(4);

        this.createTable(document.getElementById('chord-table-1'), 1);
        this.createTable(document.getElementById('chord-table-2'), 2);
        this.createTable(document.getElementById('chord-table-3'), 3);
        this.createTable(document.getElementById('chord-table-4'), 4);
        this.createTable(document.getElementById('chord-table-5'), 5);
        this.createTable(document.getElementById('chord-table-6'), 6);
        this.createTable(document.getElementById('chord-table-7'), 7);
        this.createTable(document.getElementById('chord-table-8'), 8);
        this.createTable(document.getElementById('chord-table-9'), 9);
        this.createTable(document.getElementById('chord-table-10'), 10);
        this.createTable(document.getElementById('chord-table-11'), 11);
        this.createTable(document.getElementById('chord-table-12'), 12);
        this.createTable(document.getElementById('chord-table-13'), 13);
        this.createTable(document.getElementById('chord-table-14'), 14);
        this.createTable(document.getElementById('chord-table-15'), 15);
        this.createTable(document.getElementById('chord-table-16'), 16);
        this.createTable(document.getElementById('chord-table-17'), 17);
        this.createTable(document.getElementById('chord-table-18'), 18);
        this.createTable(document.getElementById('chord-table-19'), 19);
        this.createTable(document.getElementById('chord-table-20'), 20);
        this.createTable(document.getElementById('chord-table-21'), 21);
        this.createTable(document.getElementById('chord-table-22'), 22);
        this.createTable(document.getElementById('chord-table-23'), 23);
        this.createTable(document.getElementById('chord-table-24'), 24);
        this.createTable(document.getElementById('chord-table-25'), 25);
        this.createTable(document.getElementById('chord-table-26'), 26);
        this.createTable(document.getElementById('chord-table-27'), 27);
        this.createTable(document.getElementById('chord-table-28'), 28);
        this.createTable(document.getElementById('chord-table-29'), 29);
        this.createTable(document.getElementById('chord-table-30'), 30);
        this.createTable(document.getElementById('chord-table-31'), 31);
        this.createTable(document.getElementById('chord-table-32'), 32);
        this.addClickListenersToTable(1);
        this.addClickListenersToTable(2);
        this.addClickListenersToTable(3);
        this.addClickListenersToTable(4);
        this.addClickListenersToTable(5);
        this.addClickListenersToTable(6);
        this.addClickListenersToTable(7);
        this.addClickListenersToTable(8);
        this.addClickListenersToTable(9);
        this.addClickListenersToTable(10);
        this.addClickListenersToTable(11);
        this.addClickListenersToTable(12);
        this.addClickListenersToTable(13);
        this.addClickListenersToTable(14);
        this.addClickListenersToTable(15);
        this.addClickListenersToTable(16);
        this.addClickListenersToTable(17);
        this.addClickListenersToTable(18);
        this.addClickListenersToTable(19);
        this.addClickListenersToTable(20);
        this.addClickListenersToTable(21);
        this.addClickListenersToTable(22);
        this.addClickListenersToTable(23);
        this.addClickListenersToTable(24);
        this.addClickListenersToTable(25);
        this.addClickListenersToTable(26);
        this.addClickListenersToTable(27);
        this.addClickListenersToTable(28);
        this.addClickListenersToTable(29);
        this.addClickListenersToTable(30);
        this.addClickListenersToTable(31);
        this.addClickListenersToTable(32);
    },
    addClickListenersToTable(number) {
        var names = document.getElementsByName("offset-" + number);
        for(var i=0; i < names.length; i++) {
            if(i == 27) {
                names[i].checked = true;
                names[i].nextSibling.setAttribute("class", "checkmark-2");
            }

            names[i].addEventListener('click', () => { 
                this.getPositionOfElement(number);
            });
        }
    },
    addClickListenersToPitchTable(number) {
        var names = document.getElementsByName("pitch-" + number);
        var rowPos = 0;
        var columnPos = 0;
        for(var i=0; i < names.length; i++) {
            if(i == 12 * 2) {
                names[i].checked = true;
            }
            
            /*
            if(i > 0 && i % 5 == 0) columnPos++;
            rowPos = (i % 5);
            var noteNumber = ((12 * rowPos) + (-columnPos + 10)) % 12;
            noteNumber = i;
            if(noteNumber % 3 == 0 || noteNumber % 6 == 0 || noteNumber % 8 == 0 || noteNumber % 10 == 0) {
                names[i].nextSibling.setAttribute("class", "checkmark-2");
            }
            */

            names[i].addEventListener('click', () => { 
                this.getPositionOfPitchElement(number);
            });
        }
    },
    getPositionOfPitchElement(number) {
        var names = document.getElementsByName("pitch-" + number);
        var rowPos = 0;
        var columnPos = 1;
        for(var i=0; i < names.length; i++) {
            if(i > 0 && i % 5 == 0) columnPos++;
            rowPos = (i % 5);
            if(names[i].checked == true) {
                //chordRoots[number-1] = ((12 * rowPos) + (-columnPos + 10)) - 24;
                chordRoots[number-1] = i - 24;
            }
        }
    },
    getPositionOfElement(number) {
        var names = document.getElementsByName("offset-" + number);
        var rowPos = 0;
        var columnPos = 0;
        for(var i=0; i < names.length; i++) {
            if(i > 0 && i % 5 == 0) columnPos++;
            rowPos = (i % 5) - 2;
            if(names[i].checked == true) {
                octaveMultipliers[number-1] = rowPos;
                semitoneOffsets[number-1] = -columnPos + 5;
            }
        }
    },
    createTable(parent, number) {
        for(var x=0; x < 11; x++)
        {
            for(var y=0; y < 5; y++)
            {
                var element = parent.getElementsByClassName("chord-row-" + x)[0];
                element.innerHTML += 
              '<td><label class="container"><input type="radio" id="offset-' + number + '-' + x + '-' + y +'" name="offset-' + number + '" value="' + x + y +'"><span class="checkmark"></span></label></td>';
            }
        }
    },
    createPitchTable(parent, number) {
        for(var x=0; x < 1; x++)
        {
            for(var y=0; y < (12 * 4) + 1; y++)
            {
                var element = parent.getElementsByClassName("pitch-row-" + x)[0];
                element.innerHTML += 
              '<td><label class="container"><input type="radio" id="pitch-' + number + '-' + x + '-' + y +'" name="pitch-' + number + '" value="' + x + y +'"><span class="checkmark"></span></label></td>';
            }
        }
    },
    checkWhichRadioButtonSelected(array) {
        for(var x=0; x < 11; x++)
        {
            for(var y=0; y < 7; y++)
            {
                array[x][y].checked();
            }
        }
    },
    setupEventListeners() {
        recordButtonSelector.addEventListener('click', () => {
            recording = !recording;
            if(recording) 
            {
                recordButtonSelector.value = "■";
                this.startRecording();
            }
            else
            {
                recordButtonSelector.value = "●";
                this.stopRecording();
            }
        });
        downloadButtonSelector.addEventListener('click', () => {
            window.open(dataUri);
        });
       
        attackSelector.addEventListener('change', () => {
            synth.setAmpAttackTime(parseInt(attackSelector.value)/1000);
        });
        
        releaseSelector.addEventListener('change', () => {
            synth.setAmpReleaseTime(parseInt(releaseSelector.value)/100);
        });
        cutoffSelector.addEventListener('change', () => {
            // Set filter cuttoff
            synth.setFilterCutoff(parseInt(cutoffSelector.value)/100);
        });
        waveSelector.addEventListener('change', () => {
            // Set filter cuttoff
            synth.setOscWave(parseInt(waveSelector.value));
        });

        /*
        sustainSelector.addEventListener('change', () => {
            sustainOn = !sustainOn;
        });
        */
        tempoSelector.addEventListener('change', () => {
            tempo = parseInt(tempoSelector.value);
        });
        /*
        startNoteSelector.addEventListener('change', () => {
            key = parseInt(startNoteSelector.value);
            zeroChordRoot = this.getCorrectMinorAndMajorRoot(parseInt(firstChordSelector.value));
            firstChordRoot = this.getCorrectMinorAndMajorRoot(this.getCorrectMinorAndMajorRootFromSemitone(firstChordRoot));
            secondChordRoot = this.getCorrectMinorAndMajorRoot(this.getCorrectMinorAndMajorRootFromSemitone(secondChordRoot));
            thirdChordRoot = this.getCorrectMinorAndMajorRoot(this.getCorrectMinorAndMajorRootFromSemitone(thirdChordRoot));
            firstChordMinorOffset = this.changeToMinorOrMajor(firstChordRoot);
            secondChordMinorOffset = this.changeToMinorOrMajor(secondChordRoot);
            thirdChordMinorOffset = this.changeToMinorOrMajor(thirdChordRoot);
        });
        secondChordSelector.addEventListener('change', () => {
            firstChordRoot = this.getCorrectMinorAndMajorRoot(parseInt(secondChordSelector.value));
            firstChordMinorOffset = this.changeToMinorOrMajor(firstChordRoot);
        });
        thirdChordSelector.addEventListener('change', () => {
            secondChordRoot = this.getCorrectMinorAndMajorRoot(parseInt(thirdChordSelector.value));
            secondChordMinorOffset = this.changeToMinorOrMajor(secondChordRoot);
        });
        fourthChordSelector.addEventListener('change', () => {
            thirdChordRoot = this.getCorrectMinorAndMajorRoot(parseInt(fourthChordSelector.value));
            thirdChordMinorOffset = this.changeToMinorOrMajor(thirdChordRoot);
        });
        */
        firstTypeSelector.addEventListener('click', () => {
            if(zeroChordMinorOffset == 0) zeroChordMinorOffset = -1;
            else if(zeroChordMinorOffset == -1) zeroChordMinorOffset = 0;
            /*
            firstChordRoot = this.getCorrectMinorAndMajorRoot(this.getCorrectMinorAndMajorRootFromSemitone(firstChordRoot));
            secondChordRoot = this.getCorrectMinorAndMajorRoot(this.getCorrectMinorAndMajorRootFromSemitone(secondChordRoot));
            thirdChordRoot = this.getCorrectMinorAndMajorRoot(this.getCorrectMinorAndMajorRootFromSemitone(thirdChordRoot));
            firstChordMinorOffset = this.changeToMinorOrMajor(firstChordRoot);
            secondChordMinorOffset = this.changeToMinorOrMajor(secondChordRoot);
            thirdChordMinorOffset = this.changeToMinorOrMajor(thirdChordRoot);
            console.log(zeroChordMinorOffset);
            */
        });
        secondTypeSelector.addEventListener('click', () => {
            if(firstChordMinorOffset == 0) firstChordMinorOffset = -1;
            else if(firstChordMinorOffset == -1) firstChordMinorOffset = 0;
        });
        thirdTypeSelector.addEventListener('click', () => {
            if(secondChordMinorOffset == 0) secondChordMinorOffset = -1;
            else if(secondChordMinorOffset == -1) secondChordMinorOffset = 0;
        });
        fourthTypeSelector.addEventListener('click', () => {
            if(thirdChordMinorOffset == 0) thirdChordMinorOffset = -1;
            else if(thirdChordMinorOffset == -1) thirdChordMinorOffset = 0;
        });

        document.addEventListener('keydown', (event) => {
            if(event.key === ' ') {
                amplitude = 1.0;
                if(shiftOctave === 0 || shiftOctave === -12) shiftOctave = 12;
                else shiftOctave = 0;
            }
            if(event.key === 'Enter')
            {
                if(shiftOctave === 0 || shiftOctave === 12) shiftOctave = -12;
                else shiftOctave = 0;
            }

            if (event.key === '1') {
                //this.displayAndPlayChord('maj7');
                //sound.stop(noteIds[24+0+0]);
                //sound.stop(noteIds[24+0+7]);
                //sound.stop(noteIds[24+0+9]);
                //soundEngine.playNote(16+chordRoots[0]+key);
                
                soundEngine.playNote(24+0+(octaveMultipliers[0]*12)+semitoneOffsets[0]+chordRoots[0]+key);
                if(rootDoubler1 > 0) soundEngine.playNote(24+12+(octaveMultiplier1)+chordRoots[0]+key);
                if(rootDoubler1 > 1) soundEngine.playNote(24+24+(octaveMultiplier1)+chordRoots[0]+key);
                //soundEngine.playNote(24+12+chordRoots[0]+key);
                //soundEngine.playNote(24+24+chordRoots[0]+key);
                this.changeFaderColor(document.getElementById("chord-table-1").parentElement, false); 
            }
            if (event.key === '2') {
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+4+(octaveMultipliers[1]*12)+semitoneOffsets[1]+chordRoots[0]+zeroChordMinorOffset+key);
                //this.doubleNote(24+4+chordRoots[0]+zeroChordMinorOffset+key, doubler12);
                this.changeFaderColor(document.getElementById("chord-table-2").parentElement, false);  
            }
            if (event.key === '3') {
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+7+(octaveMultipliers[2]*12)+semitoneOffsets[2]+chordRoots[0]+key);
                this.changeFaderColor(document.getElementById("chord-table-3").parentElement, false);  
            }
            if (event.key === '4') {
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[3]*12)+semitoneOffsets[3]+chordRoots[0]+zeroChordMinorOffset+key);
                this.changeFaderColor(document.getElementById("chord-table-4").parentElement, false); 
            }
            if (event.key === '5') {
                //this.displayAndPlayChord('maj7');
                //sound.stop(noteIds[24+0+0]);
                //sound.stop(noteIds[24+0+7]);
                //sound.stop(noteIds[24+0+9]);
                
                soundEngine.playNote(24+14+(octaveMultipliers[4]*12)+semitoneOffsets[4]+chordRoots[0]+key);
                //soundEngine.playNote(8+0+key);
                this.changeFaderColor(document.getElementById("chord-table-5").parentElement, false);  
            }
            if (event.key === '6') {
                //this.displayAndPlayChord('maj7');

                soundEngine.playNote(24+16+(octaveMultipliers[5]*12)+semitoneOffsets[5]+chordRoots[0]+zeroChordMinorOffset+key);
                //soundEngine.playNote(8+4+key);
                this.changeFaderColor(document.getElementById("chord-table-6").parentElement, false);   
            }
            if (event.key === '7') {
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+19+(octaveMultipliers[6]*12)+semitoneOffsets[6]+chordRoots[0]+key);
                //soundEngine.playNote(8+7+key);
                this.changeFaderColor(document.getElementById("chord-table-7").parentElement, false); 
            }
            if (event.key === '8') {
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+23+(octaveMultipliers[7]*12)+semitoneOffsets[7]+chordRoots[0]+key+zeroChordMinorOffset);
                //soundEngine.playNote(8+11+key+zeroChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-8").parentElement, false); 
            }
            if (event.key === '9') {
                soundEngine.playNote(24+0+(octaveMultiplier1*12)+semitoneOffset1+chordRoots[0]+key);
                soundEngine.playNote(24+4+(octaveMultiplier2*12)+semitoneOffset2+chordRoots[0]+zeroChordMinorOffset+key);
                soundEngine.playNote(24+7+(octaveMultiplier3*12)+semitoneOffset3+chordRoots[0]+key);
                soundEngine.playNote(24+11+(octaveMultiplier4*12)+semitoneOffset4+chordRoots[0]+zeroChordMinorOffset+key);
                soundEngine.playNote(24+14+(octaveMultiplier5*12)+semitoneOffset5+chordRoots[0]+key);
                soundEngine.playNote(24+16+(octaveMultiplier6*12)+semitoneOffset6+chordRoots[0]+zeroChordMinorOffset+key);
                soundEngine.playNote(24+19+(octaveMultiplier7*12)+semitoneOffset7+chordRoots[0]+key);
                soundEngine.playNote(24+23+(octaveMultiplier8*12)+semitoneOffset8+chordRoots[0]+zeroChordMinorOffset+key);
            }
            
            if (event.key === 'q') {
                //this.displayAndPlayChord('maj7');
                //sound.stop(noteIds[24+0+0]);
                //sound.stop(noteIds[24+0+7]);
                //sound.stop(noteIds[24+0+9]);
                //soundEngine.playNote(16+chordRoots[1]+key);
                let mult = 0
                if(include1) mult = 12;
                soundEngine.playNote(24+0+(octaveMultipliers[8]*12)+semitoneOffsets[8]+chordRoots[1]+key+(octaveTranspose2*mult));
                //soundEngine.playNote(24+12+chordRoots[1]+key);
                this.changeFaderColor(document.getElementById("chord-table-9").parentElement, false); 
            }
            if (event.key === 'w') {
                //this.displayAndPlayChord('maj7');
                let mult = 0
                if(include2) mult = 12;
                this.changeFaderColor(document.getElementById("chord-table-10").parentElement, false); 
                soundEngine.playNote(24+4+(octaveMultipliers[9]*12)+semitoneOffsets[9]+chordRoots[1]+firstChordMinorOffset+key+(octaveTranspose2*mult));
            }
            if (event.key === 'e') {
                let mult = 0
                if(include3) mult = 12;
                this.changeFaderColor(document.getElementById("chord-table-11").parentElement, false); 
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+7+(octaveMultipliers[10]*12)+semitoneOffsets[10]+chordRoots[1]+key+(octaveTranspose2*mult));
            }
            if (event.key === 'r') {
                let mult = 0
                if(include4) mult = 12;
                this.changeFaderColor(document.getElementById("chord-table-12").parentElement, false); 
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[11]*12)+semitoneOffsets[11]+chordRoots[1]+firstChordMinorOffset+key+(octaveTranspose2*mult));
            }
            if (event.key === 't') {
                let mult = 0
                if(include5) mult = 12;
                //this.displayAndPlayChord('maj7');
                //sound.stop(noteIds[24+0+0]);
                //sound.stop(noteIds[24+0+7]);
                //sound.stop(noteIds[24+0+9]);
                this.changeFaderColor(document.getElementById("chord-table-13").parentElement, false);  
                soundEngine.playNote(24+14+(octaveMultipliers[12]*12)+semitoneOffsets[12]+chordRoots[1]+key+(octaveTranspose2*mult));
                //soundEngine.playNote(8+0+key+firstChordRoot);
            }
            if (event.key === 'y') {
                let mult = 0
                if(include6) mult = 12;
                //this.displayAndPlayChord('maj7');
                this.changeFaderColor(document.getElementById("chord-table-14").parentElement, false); 
                soundEngine.playNote(24+16+(octaveMultipliers[13]*12)+semitoneOffsets[13]+chordRoots[1]+firstChordMinorOffset+key+(octaveTranspose2*mult));
                
                //soundEngine.playNote(8+4+key+firstChordRoot);
            }
            if (event.key === 'u') {
                let mult = 0
                if(include7) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+19+(octaveMultipliers[14]*12)+semitoneOffsets[14]+chordRoots[1]+key+(octaveTranspose2*mult));
                //soundEngine.playNote(8+7+key+firstChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-15").parentElement, false); 
            }
            if (event.key === 'i') {
                let mult = 0
                if(include8) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[15]*12)+semitoneOffsets[15]+chordRoots[1]+firstChordMinorOffset+key+12+(octaveTranspose2*mult));
                //soundEngine.playNote(8+11+key+firstChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-16").parentElement, false); 
            }
            if (event.key === 'o') {
                soundEngine.playNote(24+0+(octaveMultiplier9*12)+semitoneOffset9+chordRoots[1]+key);
                soundEngine.playNote(24+4+(octaveMultiplier10*12)+semitoneOffset10+chordRoots[1]+firstChordMinorOffset+key);
                soundEngine.playNote(24+7+(octaveMultiplier11*12)+semitoneOffset11+chordRoots[1]+key);
                soundEngine.playNote(24+11+(octaveMultipliers[11]*12)+semitoneOffsets[11]+chordRoots[1]+firstChordMinorOffset+key);
                soundEngine.playNote(24+14+(octaveMultipliers[12]*12)+semitoneOffsets[12]+chordRoots[1]+key);
                soundEngine.playNote(24+16+(octaveMultipliers[13]*12)+semitoneOffsets[13]+chordRoots[1]+firstChordMinorOffset+key);
                soundEngine.playNote(24+19+(octaveMultipliers[14]*12)+semitoneOffsets[14]+chordRoots[1]+key);
                soundEngine.playNote(24+23+(octaveMultipliers[15]*12)+semitoneOffsets[15]+chordRoots[1]+firstChordMinorOffset+key);
            }

            if (event.key === 'a') {
                let mult = 0
                if(include9) mult = 12;
                //this.displayAndPlayChord('maj7');
                //sound.stop(noteIds[24+0+0]);
                //sound.stop(noteIds[24+0+7]);
                //sound.stop(noteIds[24+0+9]);
                //soundEngine.playNote(16+chordRoots[2]+key);
                soundEngine.playNote(24+0+(octaveMultipliers[16]*12)+semitoneOffsets[16]+chordRoots[2]+key+(octaveTranspose3*mult));
                this.changeFaderColor(document.getElementById("chord-table-17").parentElement, false); 
            }
            if (event.key === 's') {
                let mult = 0
                if(include10) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+4+(octaveMultipliers[17]*12)+semitoneOffsets[17]+chordRoots[2]+secondChordMinorOffset+key+(octaveTranspose3*mult));
                this.changeFaderColor(document.getElementById("chord-table-18").parentElement, false); 
            }
            if (event.key === 'd') {
                let mult = 0
                if(include11) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+7+(octaveMultipliers[18]*12)+semitoneOffsets[18]+chordRoots[2]+key+(octaveTranspose3*mult));
                this.changeFaderColor(document.getElementById("chord-table-19").parentElement, false); 
            }
            if (event.key === 'f') {
                let mult = 0
                if(include12) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[19]*12)+semitoneOffsets[19]+chordRoots[2]+secondChordMinorOffset+key+(octaveTranspose3*mult));
                this.changeFaderColor(document.getElementById("chord-table-20").parentElement, false);  
            }
            if (event.key === 'g') {
                let mult = 0
                if(include13) mult = 12;
                //this.displayAndPlayChord('maj7');

                soundEngine.playNote(24+14+(octaveMultipliers[20]*12)+semitoneOffsets[20]+chordRoots[2]+key+(octaveTranspose3*mult));
                //soundEngine.playNote(8+0+key+secondChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-21").parentElement, false); 
            }
            if (event.key === 'h') {
                let mult = 0
                if(include14) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+16+(octaveMultipliers[21]*12)+semitoneOffsets[21]+chordRoots[2]+secondChordMinorOffset+key+(octaveTranspose3*mult));
                //soundEngine.playNote(8+4+key+secondChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-22").parentElement, false); 
            }
            if (event.key === 'j') {
                let mult = 0
                if(include15) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+19+(octaveMultipliers[22]*12)+semitoneOffsets[22]+chordRoots[2]+key+(octaveTranspose3*mult));
                //soundEngine.playNote(8+7+key+secondChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-23").parentElement, false); 
            }
            if (event.key === 'k') {
                let mult = 0
                if(include16) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[23]*12)+semitoneOffsets[23]+chordRoots[2]+secondChordMinorOffset+key+12+(octaveTranspose3*mult));
                this.changeFaderColor(document.getElementById("chord-table-24").parentElement, false);  
            }
            if (event.key === 'l') {
                soundEngine.playNote(24+0+(octaveMultipliers[16]*12)+semitoneOffsets[16]+chordRoots[2]+key);
                soundEngine.playNote(24+4+(octaveMultipliers[17]*12)+semitoneOffsets[17]+chordRoots[2]+secondChordMinorOffset+key);
                soundEngine.playNote(24+7+(octaveMultipliers[18]*12)+semitoneOffsets[18]+chordRoots[2]+key);
                soundEngine.playNote(24+11+(octaveMultipliers[19]*12)+semitoneOffsets[19]+chordRoots[2]+secondChordMinorOffset+key);
                soundEngine.playNote(24+14+(octaveMultipliers[20]*12)+semitoneOffsets[20]+chordRoots[2]+key);
                soundEngine.playNote(24+16+(octaveMultipliers[21]*12)+semitoneOffsets[21]+chordRoots[2]+secondChordMinorOffset+key);
                soundEngine.playNote(24+19+(octaveMultipliers[22]*12)+semitoneOffsets[22]+chordRoots[2]+key);
                soundEngine.playNote(24+23+(octaveMultipliers[23]*12)+semitoneOffsets[23]+chordRoots[2]+secondChordMinorOffset+key);
            }
            
            if (event.key === 'z') {
                let mult = 0
                if(include17) mult = 12;
                //this.displayAndPlayChord('maj7');
                //sound.stop(noteIds[24+0+0]);
                //sound.stop(noteIds[24+0+7]);
                //sound.stop(noteIds[24+0+9]);
                //soundEngine.playNote(16+chordRoots[3]+key);
                soundEngine.playNote(24+0+(octaveMultipliers[24]*12)+semitoneOffsets[24]+chordRoots[3]+key+(octaveTranspose4*mult));
                //soundEngine.playNote(24+12+0+chordRoots[3]+key);
                this.changeFaderColor(document.getElementById("chord-table-25").parentElement, false); 
            }
            if (event.key === 'x') {
                let mult = 0
                if(include18) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+4+(octaveMultipliers[25]*12)+semitoneOffsets[25]+chordRoots[3]+thirdChordMinorOffset+key+(octaveTranspose4*mult));
                this.changeFaderColor(document.getElementById("chord-table-26").parentElement, false); 
            }
            if (event.key === 'c') {
                let mult = 0
                if(include19) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+7+(octaveMultipliers[26]*12)+semitoneOffsets[26]+chordRoots[3]+key+(octaveTranspose4*mult));
                this.changeFaderColor(document.getElementById("chord-table-27").parentElement, false); 
            }
            if (event.key === 'v') {
                let mult = 0
                if(include20) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[27]*12)+semitoneOffsets[27]+chordRoots[3]+thirdChordMinorOffset+key+(octaveTranspose4*mult));
                this.changeFaderColor(document.getElementById("chord-table-28").parentElement, false); 
            }
            if (event.key === 'b') {
                let mult = 0
                if(include21) mult = 12;
                //this.displayAndPlayChord('maj7');

                soundEngine.playNote(24+14+(octaveMultipliers[28]*12)+semitoneOffsets[28]+chordRoots[3]+key+(octaveTranspose4*mult));
                //soundEngine.playNote(8+0+key+thirdChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-29").parentElement, false);  
            }
            if (event.key === 'n') {
                let mult = 0
                if(include22) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+16+(octaveMultipliers[29]*12)+semitoneOffsets[29]+chordRoots[3]+thirdChordMinorOffset+key+(octaveTranspose4*mult));
                //soundEngine.playNote(8+4+key+thirdChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-30").parentElement, false);  
            }
            if (event.key === 'm') {
                let mult = 0
                if(include23) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+19+(octaveMultipliers[30]*12)+semitoneOffsets[30]+chordRoots[3]+key+(octaveTranspose4*mult));
                //soundEngine.playNote(8+7+key+thirdChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-31").parentElement, false); 
            }
            if (event.key === ',') {
                let mult = 0
                if(include24) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[31]*12)+semitoneOffsets[31]+chordRoots[3]+thirdChordMinorOffset+key+12+(octaveTranspose4*mult));
                //soundEngine.playNote(8+11+key+thirdChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-32").parentElement, false); 
            }
            if (event.key === '.') {
                soundEngine.playNote(24+0+(octaveMultipliers[24]*12)+semitoneOffsets[24]+chordRoots[3]+key);
                soundEngine.playNote(24+4+(octaveMultipliers[25]*12)+semitoneOffsets[25]+chordRoots[3]+thirdChordMinorOffset+key);
                soundEngine.playNote(24+7+(octaveMultipliers[26]*12)+semitoneOffsets[26]+chordRoots[3]+key);
                soundEngine.playNote(24+11+(octaveMultipliers[27]*12)+semitoneOffsets[27]+chordRoots[3]+thirdChordMinorOffset+key);
            }
            
            //console.log(event.keyCode);
        });
        document.addEventListener('keyup', (event) => {
            // TODO: Find a way to check what the root was when the note was played, so that the correct note can be turned off when the key comes up.
            if(event.key === ' ') {
                amplitude = 0.25;
                //shiftOctave = false;
            }

            event.key.toLowerCase();
            
            if (event.key === '1') {
                /*
                var markerIndex = markedKeys.indexOf(24+0+(octaveMultiplier1)+chordRoots[0]+key+1);
                if(markerIndex > -1) markedKeys.splice(markerIndex,1);
                pianokeys.setMarkedKeys(markedKeys);
                */
                soundEngine.playNote(24+0+(octaveMultipliers[0]*12)+semitoneOffsets[0]+chordRoots[0]+key, true);
                this.changeFaderColor(document.getElementById("chord-table-1").parentElement, true); 
            }
            if (event.key === '2') {
                soundEngine.playNote(24+4+(octaveMultipliers[1]*12)+semitoneOffsets[1]+chordRoots[0]+zeroChordMinorOffset+key, true);
                this.changeFaderColor(document.getElementById("chord-table-2").parentElement, true); 
            }
            if (event.key === '3') {
                soundEngine.playNote(24+7+(octaveMultipliers[2]*12)+semitoneOffsets[2]+chordRoots[0]+key, true);
                this.changeFaderColor(document.getElementById("chord-table-3").parentElement, true); 
            }
            if (event.key === '4') {
                soundEngine.playNote(24+11+(octaveMultipliers[3]*12)+semitoneOffsets[3]+chordRoots[0]+zeroChordMinorOffset+key, true);
                this.changeFaderColor(document.getElementById("chord-table-4").parentElement, true); 
            }
            if (event.key === '5') {
                soundEngine.playNote(24+14+(octaveMultipliers[4]*12)+semitoneOffsets[4]+chordRoots[0]+key, true);
                this.changeFaderColor(document.getElementById("chord-table-5").parentElement, true); 
            }
            if (event.key === '6') {
                soundEngine.playNote(24+16+(octaveMultipliers[5]*12)+semitoneOffsets[5]+chordRoots[0]+zeroChordMinorOffset+key, true);
                this.changeFaderColor(document.getElementById("chord-table-6").parentElement, true); 
            }
            if (event.key === '7') {
                soundEngine.playNote(24+19+(octaveMultipliers[6]*12)+semitoneOffsets[6]+chordRoots[0]+key, true);
                this.changeFaderColor(document.getElementById("chord-table-7").parentElement, true); 
            }
            if (event.key === '8') {
                soundEngine.playNote(24+23+(octaveMultipliers[7]*12)+semitoneOffsets[7]+chordRoots[0]+key+zeroChordMinorOffset, true);
                this.changeFaderColor(document.getElementById("chord-table-8").parentElement, true); 
            }
            if (event.key === '9') {
                soundEngine.playNote(24+0+(octaveMultiplier1*12)+semitoneOffset1+chordRoots[0]+key, true);
                soundEngine.playNote(24+4+(octaveMultiplier2*12)+semitoneOffset2+chordRoots[0]+zeroChordMinorOffset+key, true);
                soundEngine.playNote(24+7+(octaveMultiplier3*12)+semitoneOffset3+chordRoots[0]+key, true);
                soundEngine.playNote(24+11+(octaveMultiplier4*12)+semitoneOffset4+chordRoots[0]+zeroChordMinorOffset+key, true);
                soundEngine.playNote(24+14+(octaveMultiplier5*12)+semitoneOffset5+chordRoots[0]+key, true);
                soundEngine.playNote(24+16+(octaveMultiplier6*12)+semitoneOffset6+chordRoots[0]+zeroChordMinorOffset+key, true);
                soundEngine.playNote(24+19+(octaveMultiplier7*12)+semitoneOffset7+chordRoots[0]+key, true);
                soundEngine.playNote(24+23+(octaveMultiplier8*12)+semitoneOffset8+chordRoots[0]+zeroChordMinorOffset+key, true);
            }
            
            if (event.key === 'q') {
                let mult = 0
                if(include1) mult = 12;
                soundEngine.playNote(24+0+(octaveMultipliers[8]*12)+semitoneOffsets[8]+chordRoots[1]+key+(octaveTranspose2*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-9").parentElement, true); 
            }
            if (event.key === 'w') {
                let mult = 0
                if(include2) mult = 12;
                soundEngine.playNote(24+4+(octaveMultipliers[9]*12)+semitoneOffsets[9]+chordRoots[1]+firstChordMinorOffset+key+(octaveTranspose2*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-10").parentElement, true); 
            }
            if (event.key === 'e') {
                let mult = 0
                if(include3) mult = 12;
                soundEngine.playNote(24+7+(octaveMultipliers[10]*12)+semitoneOffsets[10]+chordRoots[1]+key+(octaveTranspose2*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-11").parentElement, true); 
            }
            if (event.key === 'r') {
                let mult = 0
                if(include4) mult = 12;
                soundEngine.playNote(24+11+(octaveMultipliers[11]*12)+semitoneOffsets[11]+chordRoots[1]+firstChordMinorOffset+key+(octaveTranspose2*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-12").parentElement, true); 
            }
            if (event.key === 't') {
                let mult = 0
                if(include5) mult = 12;
                soundEngine.playNote(24+14+(octaveMultipliers[12]*12)+semitoneOffsets[12]+chordRoots[1]+key+(octaveTranspose2*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-13").parentElement, true); 
            }
            if (event.key === 'y') {
                let mult = 0
                if(include6) mult = 12;
                soundEngine.playNote(24+16+(octaveMultipliers[13]*12)+semitoneOffsets[13]+chordRoots[1]+firstChordMinorOffset+key+(octaveTranspose2*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-14").parentElement, true); 
            }
            if (event.key === 'u') {
                let mult = 0
                if(include7) mult = 12;
                soundEngine.playNote(24+19+(octaveMultipliers[14]*12)+semitoneOffsets[14]+chordRoots[1]+key+(octaveTranspose2*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-15").parentElement, true); 
            }
            if (event.key === 'i') {
                let mult = 0
                if(include8) mult = 12;
                soundEngine.playNote(24+11+(octaveMultipliers[15]*12)+semitoneOffsets[15]+chordRoots[1]+firstChordMinorOffset+key+12+(octaveTranspose2*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-16").parentElement, true); 
            }
            if (event.key === 'o') {
                soundEngine.playNote(24+0+(octaveMultiplier9*12)+semitoneOffset9+chordRoots[1]+key, true);
                soundEngine.playNote(24+4+(octaveMultiplier10*12)+semitoneOffset10+chordRoots[1]+firstChordMinorOffset+key, true);
                soundEngine.playNote(24+7+(octaveMultiplier11*12)+semitoneOffset11+chordRoots[1]+key, true);
                soundEngine.playNote(24+11+(octaveMultipliers[11]*12)+semitoneOffsets[11]+chordRoots[1]+firstChordMinorOffset+key, true);
                soundEngine.playNote(24+14+(octaveMultipliers[12]*12)+semitoneOffsets[12]+chordRoots[1]+key, true);
                soundEngine.playNote(24+16+(octaveMultipliers[13]*12)+semitoneOffsets[13]+chordRoots[1]+firstChordMinorOffset+key, true);
                soundEngine.playNote(24+19+(octaveMultipliers[14]*12)+semitoneOffsets[14]+chordRoots[1]+key, true);
                soundEngine.playNote(24+23+(octaveMultipliers[15]*12)+semitoneOffsets[15]+chordRoots[1]+firstChordMinorOffset+key, true);
            }

            if (event.key === 'a') {
                let mult = 0
                if(include9) mult = 12;
                /*
                var markerIndex = markedKeys.indexOf(24+0+(octaveMultiplier17)+semitoneOffset17+chordRoots[2]+key+(octaveTranspose3*mult)+1);
                if(markerIndex > -1) markedKeys.splice(markerIndex,1);
                */
                soundEngine.playNote(24+0+(octaveMultipliers[16]*12)+semitoneOffsets[16]+chordRoots[2]+key+(octaveTranspose3*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-17").parentElement, true); 
            }
            if (event.key === 's') {
                let mult = 0
                if(include10) mult = 12;
                soundEngine.playNote(24+4+(octaveMultipliers[17]*12)+semitoneOffsets[17]+chordRoots[2]+secondChordMinorOffset+key+(octaveTranspose3*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-18").parentElement, true); 
            }
            if (event.key === 'd') {
                let mult = 0
                if(include11) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+7+(octaveMultipliers[18]*12)+semitoneOffsets[18]+chordRoots[2]+key+(octaveTranspose3*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-19").parentElement, true); 
            }
            if (event.key === 'f') {
                let mult = 0
                if(include12) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[19]*12)+semitoneOffsets[19]+chordRoots[2]+secondChordMinorOffset+key+(octaveTranspose3*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-20").parentElement, true); 
            }
            if (event.key === 'g') {
                let mult = 0
                if(include13) mult = 12;
                //this.displayAndPlayChord('maj7');

                soundEngine.playNote(24+14+(octaveMultipliers[20]*12)+semitoneOffsets[20]+chordRoots[2]+key+(octaveTranspose3*mult), true);
                //soundEngine.playNote(8+0+key+secondChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-21").parentElement, true); 
            }
            if (event.key === 'h') {
                let mult = 0
                if(include14) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+16+(octaveMultipliers[21]*12)+semitoneOffsets[21]+chordRoots[2]+secondChordMinorOffset+key+(octaveTranspose3*mult), true);
                //soundEngine.playNote(8+4+key+secondChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-22").parentElement, true); 
            }
            if (event.key === 'j') {
                let mult = 0
                if(include15) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+19+(octaveMultipliers[22]*12)+semitoneOffsets[22]+chordRoots[2]+key+(octaveTranspose3*mult), true);
                //soundEngine.playNote(8+7+key+secondChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-23").parentElement, true); 
            }
            if (event.key === 'k') {
                let mult = 0
                if(include16) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[23]*12)+semitoneOffsets[23]+chordRoots[2]+secondChordMinorOffset+key+12+(octaveTranspose3*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-24").parentElement, true); 
            }
            if (event.key === 'l') {
                soundEngine.playNote(24+0+(octaveMultipliers[16]*12)+semitoneOffsets[16]+chordRoots[2]+key, true);
                soundEngine.playNote(24+4+(octaveMultipliers[17]*12)+semitoneOffsets[17]+chordRoots[2]+secondChordMinorOffset+key, true);
                soundEngine.playNote(24+7+(octaveMultipliers[18]*12)+semitoneOffsets[18]+chordRoots[2]+key, true);
                soundEngine.playNote(24+11+(octaveMultipliers[19]*12)+semitoneOffsets[19]+chordRoots[2]+secondChordMinorOffset+key, true);
                soundEngine.playNote(24+14+(octaveMultipliers[20]*12)+semitoneOffsets[20]+chordRoots[2]+key, true);
                soundEngine.playNote(24+16+(octaveMultipliers[21]*12)+semitoneOffsets[21]+chordRoots[2]+secondChordMinorOffset+key, true);
                soundEngine.playNote(24+19+(octaveMultipliers[22]*12)+semitoneOffsets[22]+chordRoots[2]+key, true);
                soundEngine.playNote(24+23+(octaveMultipliers[23]*12)+semitoneOffsets[23]+chordRoots[2]+secondChordMinorOffset+key, true);
            }
            
            if (event.key === 'z') {
                let mult = 0
                if(include17) mult = 12;
                //this.displayAndPlayChord('maj7');
                //sound.stop(noteIds[24+0+0]);
                //sound.stop(noteIds[24+0+7]);
                //sound.stop(noteIds[24+0+9]);
                //soundEngine.playNote(16+chordRoots[3]+key);
                soundEngine.playNote(24+0+(octaveMultipliers[24]*12)+semitoneOffsets[24]+chordRoots[3]+key+(octaveTranspose4*mult), true);
                //soundEngine.playNote(24+12+0+chordRoots[3]+key);
                this.changeFaderColor(document.getElementById("chord-table-25").parentElement, true); 
            }
            if (event.key === 'x') {
                let mult = 0
                if(include18) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+4+(octaveMultipliers[25]*12)+semitoneOffsets[25]+chordRoots[3]+thirdChordMinorOffset+key+(octaveTranspose4*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-26").parentElement, true); 
            }
            if (event.key === 'c') {
                let mult = 0
                if(include19) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+7+(octaveMultipliers[26]*12)+semitoneOffsets[26]+chordRoots[3]+key+(octaveTranspose4*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-27").parentElement, true); 
            }
            if (event.key === 'v') {
                let mult = 0
                if(include20) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[27]*12)+semitoneOffsets[27]+chordRoots[3]+thirdChordMinorOffset+key+(octaveTranspose4*mult), true);
                this.changeFaderColor(document.getElementById("chord-table-28").parentElement, true); 
            }
            if (event.key === 'b') {
                let mult = 0
                if(include21) mult = 12;
                //this.displayAndPlayChord('maj7');

                soundEngine.playNote(24+14+(octaveMultipliers[28]*12)+semitoneOffsets[28]+chordRoots[3]+key+(octaveTranspose4*mult), true);
                //soundEngine.playNote(8+0+key+thirdChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-29").parentElement, true); 
            }
            if (event.key === 'n') {
                let mult = 0
                if(include22) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+16+(octaveMultipliers[29]*12)+semitoneOffsets[29]+chordRoots[3]+thirdChordMinorOffset+key+(octaveTranspose4*mult), true);
                //soundEngine.playNote(8+4+key+thirdChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-30").parentElement, true); 
            }
            if (event.key === 'm') {
                let mult = 0
                if(include23) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+19+(octaveMultipliers[30]*12)+semitoneOffsets[30]+chordRoots[3]+key+(octaveTranspose4*mult), true);
                //soundEngine.playNote(8+7+key+thirdChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-31").parentElement, true); 
            }
            if (event.key === ',') {
                let mult = 0
                if(include24) mult = 12;
                //this.displayAndPlayChord('maj7');
                soundEngine.playNote(24+11+(octaveMultipliers[31]*12)+semitoneOffsets[31]+chordRoots[3]+thirdChordMinorOffset+key+12+(octaveTranspose4*mult), true);
                //soundEngine.playNote(8+11+key+thirdChordRoot);
                this.changeFaderColor(document.getElementById("chord-table-32").parentElement, true); 
            }
            if (event.key === '.') {
                soundEngine.playNote(24+0+(octaveMultipliers[24]*12)+semitoneOffsets[24]+chordRoots[3]+key, true);
                soundEngine.playNote(24+4+(octaveMultipliers[25]*12)+semitoneOffsets[25]+chordRoots[3]+thirdChordMinorOffset+key, true);
                soundEngine.playNote(24+7+(octaveMultipliers[26]*12)+semitoneOffsets[26]+chordRoots[3]+key, true);
                soundEngine.playNote(24+11+(octaveMultipliers[27]*12)+semitoneOffsets[27]+chordRoots[3]+thirdChordMinorOffset+key, true);
                soundEngine.playNote(24+14+(octaveMultipliers[24]*12)+semitoneOffsets[24]+chordRoots[3]+key, true);
                soundEngine.playNote(24+16+(octaveMultipliers[25]*12)+semitoneOffsets[25]+chordRoots[3]+thirdChordMinorOffset+key, true);
                soundEngine.playNote(24+19+(octaveMultipliers[26]*12)+semitoneOffsets[26]+chordRoots[3]+key, true);
                soundEngine.playNote(24+11+(octaveMultipliers[27]*12)+semitoneOffsets[27]+chordRoots[3]+thirdChordMinorOffset+key, true);
            }
            
            //console.log(event.keyCode);
        });
    },
    displayAndPlayChord(selectedChord) {
        let chordIntervals = chord(selectedChord).intervals;
        intervalsInChord.innerText = chordIntervals.join(' - ');
        
        const startNoteWithOctave = selectedStartNote + selectedOctave;
        let chordNotes = chordIntervals.map(val => {
            return transpose(startNoteWithOctave, val);
        });
        notesInChord.innerText = chordNotes.join(' - ');
        soundEngine.play(chordNotes);
    },
    changeToMinorOrMajor(note) {
        var offset = 0;
        if(zeroChordMinorOffset == 0)
        {
            if(note == 0) offset = 0;
            else if(note == 2) offset = -1;
            else if(note == 4) offset = -1;
            else if(note == 5) offset = 0;
            else if(note == 7) offset = 0;
            else if(note == 9) offset = -1;
            else if(note == 11) offset = -1;
        }
        else if(zeroChordMinorOffset == -1)
        {
            if(note == 0) offset = -1;
            else if(note == 2) offset = 0;
            else if(note == 3) offset = 0;
            else if(note == 5) offset = -1;
            else if(note == 7) offset = -1;
            else if(note == 8) offset = 0;
            else if(note == 10) offset = 0;
        }
        return offset;
    },
    getCorrectMinorAndMajorRoot(note) {
        var semitone = 0;
        if(zeroChordMinorOffset == 0)
        {
            if(note == 0) semitone = 0;
            else if(note == 1) semitone = 2;
            else if(note == 2) semitone = 4;
            else if(note == 3) semitone = 5;
            else if(note == 4) semitone = 7;
            else if(note == 5) semitone = 9;
            else if(note == 6) semitone = 11;
        }
        else if(zeroChordMinorOffset == -1)
        {
            if(note == 0) semitone = 0;
            else if(note == 1) semitone = 2;
            else if(note == 2) semitone = 3;
            else if(note == 3) semitone = 5;
            else if(note == 4) semitone = 7;
            else if(note == 5) semitone = 8;
            else if(note == 6) semitone = 10;
        }
        return semitone;
    },
    getCorrectMinorAndMajorRootFromSemitone(semitone) {
        var note = 0;
        if(semitone == 0) note = 0;
        else if(semitone == 2) note = 1;
        else if(semitone == 3 || semitone == 4) note = 2;
        else if(semitone == 5) note = 3;
        else if(semitone == 7) note = 4;
        else if(semitone == 8 || semitone == 9) note = 5;
        else if(semitone == 10 || semitone == 11) note = 6;
        return note;
    },
    //you could make this able to double notes upwards as well
    doubleNote(noteRoot, doubleAmt, doubleUpwards) {
        //for(i = 1; i <= doubleAmt; i++)
        //{
            //octave multiplier is not included by design
            if(doubleUpwards) soundEngine.playNote(noteRoot+(12*doubleAmt));
            else soundEngine.playNote(noteRoot+(12*-doubleAmt));
        //}
    },
    createElement(elementName, content) {
        let element = document.createElement(elementName);
        element.innerHTML = content;
        return element;
    },
    startRecording() {
        var lastUpdate = Date.now();
        var tempoMsFourthsAmt = Math.ceil(60000/(tempo));
        var tempoMsAmt = Math.ceil(tempoMsFourthsAmt / 128);
        var accumulatedTime = 0;
        var lastTickAmt = 128;
        var lastTickAmt2 = 128;
        var wantedTickLength = 0;
        var fourthTicks = 0;
        var first = true;
        // function(MIDINote, amplitude, filterOffset, currentTime)
        metronome.playNote(90, 1.0, 1.0, 0);
        function tick() {
            var now = Date.now();
            var dt = now - lastUpdate;
            accumulatedTime += dt;
            lastTickAmt++;
            lastUpdate = now;
            if(pressedFirstNote)
            {
                tickAmt += wantedTickLength;
                lastTickAmt2 += wantedTickLength;
            }

            if(accumulatedTime >= tempoMsFourthsAmt) {
                if(lastTickAmt > 0) wantedTickLength = (128 / lastTickAmt);
                /*
                console.log("________________");
                console.log("tempoMsAmt:"+tempoMsAmt);
                console.log("tempoMsFourthsAmt:"+tempoMsFourthsAmt);
                console.log("dt:"+dt);
                console.log("tickAmt:"+Math.ceil(tickAmt));
                console.log("lastTickAmt:"+lastTickAmt);
                console.log("wantedTickLength:"+wantedTickLength);
                console.log("lastTickAmt2:"+lastTickAmt2);
                */
                fourthTicks++;
                metronome.playNote(90, 1.0, 1.0, 0);
                lastTickAmt = 0;
                dt = 0;
                accumulatedTime = 0;
                lastTickAmt2 = 0;
            }
        }
        tickInterval = setInterval(tick, 0);
    },
    stopRecording() {
        clearInterval(tickInterval);
        clearInterval(metronomeInterval);
        dataUri = write.dataUri();
        recording = false;
        track = new MidiWriter.Track();
        write = new MidiWriter.Writer(track);
        tickAmt = 0;
        pressedFirstNote = false;
    },
    changeFaderColor(e, keyUp = false) {
        if(keyUp) e.style["background-color"] = "#FFF";
        else e.style["background-color"] = "#EDEDED";
    }
}

const soundEngine = {
    init() {
        /*
        const lengthOfNote = 2400;
        let timeIndex = 0;
        for (let i = 0; i <= 96; i++) {
            sound['_sprite'][i] = [timeIndex, lengthOfNote];
            timeIndex += lengthOfNote;
        }
        */
    },
    playNote(noteNumber, keyUp) {
        var randomVolume = Math.random() * (1 - 0.1) + 0.1;
        var randomFilter = Math.random() * (1 - 0.1) + 0.1;
        playableNote = noteNumber+32+shiftOctave;
        var markerIndex = markedKeys.indexOf(noteNumber+1);
        if(markerIndex > -1 && keyUp && pressedNotes[noteNumber] === true) 
        {
            pressedNotes[noteNumber] = false;
            //if(!sustainOn) sound.fade(1, 0, 750, noteIds[noteNumber]); // 750 for chords, 450 for bass
            markedKeys.splice(markerIndex,1);
            //pianokeys.setMarkedKeys(markedKeys);
        }
        else if(pressedNotes[noteNumber] === false)
        {
            pressedNotes[noteNumber] = true;
            //var soundId = sound.play(noteNumber.toString());
            // function(MIDINote, amplitude, filterOffset, currentTime)
            var soundId = synth.playNote(playableNote, 1, 1, 0);
            noteIds[noteNumber] = soundId;
            markedKeys.push(noteNumber+1);
            //pianokeys.setMarkedKeys(markedKeys);
            if(recording)
            {
                pressedFirstNote = true;
                var noteString = this.getNoteFromMidi(noteNumber);
                var writableNote = {pitch: noteString, startTick: Math.round(tickAmt), duration: 'T1'};
                track.addEvent([
                    new MidiWriter.NoteEvent(writableNote),
                    ], function(event, index) {
                    return {sequential: false};
                    }
                );
            }
        }
        
        //console.log((Date.now() - startTime) + " " + noteNumber);
    },
    play(soundSequence) {
        const chordMidiNumbers = soundSequence.map(noteName => {
            return note(noteName).midi;
        });
        sound.volume(1);
        chordMidiNumbers.forEach(noteMidiNumber => {
            sound.play(noteMidiNumber.toString());
        });
    },
    getNoteFromMidi(noteNumber) {
        var noteArray = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
        var octave = Math.floor(((noteNumber / 12) - 1) + 2);
        var noteIndex = (noteNumber % 12);
        console.log(noteArray[noteIndex] + octave);
        return noteArray[noteIndex] + octave;
    }
}

soundEngine.init();
app.init();
