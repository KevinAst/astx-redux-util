import expect     from 'expect';
import myCreator  from './myCreator';

describe('PatchableHOF tests', () => {

  let f1 = null;
  let f2 = null;

  let patchId1 = null;
  let patchId2 = null;
  let patchId3 = null;
  let patchId4 = null;

  before( function() {
    f1 = myCreator('f1');
    f2 = myCreator('f2');
  });

  it('base tests', () => {
    expect(f1('ProbeA')).toBe('f1: ProbeA');
    expect(f1('ProbeB')).toBe('f1: ProbeB');
    expect(f2('ProbeA')).toBe('f2: ProbeA');
    expect(f2('ProbeB')).toBe('f2: ProbeB');
  });

  describe('1st Patch (prepend)', () => {
    
    before( function() {
      patchId1 = myCreator.patchCreatedFns( (priorImpl, msg) => `Patch1: ${priorImpl(msg)}` );
    });
    
    it('extension tests', () => {
      expect(f1('ProbeA')).toBe('Patch1: f1: ProbeA');
      expect(f1('ProbeB')).toBe('Patch1: f1: ProbeB');
      expect(f2('ProbeA')).toBe('Patch1: f2: ProbeA');
      expect(f2('ProbeB')).toBe('Patch1: f2: ProbeB');
    });

    describe('2nd Patch (prepend again)', () => {
      
      before( function() {
        patchId2 = myCreator.patchCreatedFns( (priorImpl, msg) => `Patch2: ${priorImpl(msg)}` );
      });
      
      it('extension tests', () => {
        expect(f1('ProbeA')).toBe('Patch2: Patch1: f1: ProbeA');
        expect(f1('ProbeB')).toBe('Patch2: Patch1: f1: ProbeB');
        expect(f2('ProbeA')).toBe('Patch2: Patch1: f2: ProbeA');
        expect(f2('ProbeB')).toBe('Patch2: Patch1: f2: ProbeB');
      });

      describe('3rd Patch (trump)', () => {
        
        before( function() {
          patchId3 = myCreator.patchCreatedFns( (priorImpl, msg) => `Patch3 (trump): ${msg}` );
        });
        
        it('extension tests', () => {
          expect(f1('ProbeA')).toBe('Patch3 (trump): ProbeA');
          expect(f1('ProbeB')).toBe('Patch3 (trump): ProbeB');
          expect(f2('ProbeA')).toBe('Patch3 (trump): ProbeA');
          expect(f2('ProbeB')).toBe('Patch3 (trump): ProbeB');
        });

        describe('4th Patch (prepend)', () => {
          
          before( function() {
            patchId4 = myCreator.patchCreatedFns( (priorImpl, msg) => `Patch4: ${priorImpl(msg)}` );
          });
          
          it('extension tests', () => {
            expect(f1('ProbeA')).toBe('Patch4: Patch3 (trump): ProbeA');
            expect(f1('ProbeB')).toBe('Patch4: Patch3 (trump): ProbeB');
            expect(f2('ProbeA')).toBe('Patch4: Patch3 (trump): ProbeA');
            expect(f2('ProbeB')).toBe('Patch4: Patch3 (trump): ProbeB');
          });

          // it('crude VISUAL optimization check, when applyPatch() logging injected', () => {
          //   for (let i=0; i<10; i++) {
          //     expect(f1('Logging Cache')).toBe('Patch4: Patch3 (trump): Logging Cache');
          //   }
          // });

          describe('REMOVE 3rd Patch ... EVEN reverts the trump!', () => {
            
            before( function() {
              myCreator.patchCreatedFnsClear( patchId3 );
            });
            
            it('extension tests', () => {
              expect(f1('ProbeA')).toBe('Patch4: Patch2: Patch1: f1: ProbeA');
              expect(f1('ProbeB')).toBe('Patch4: Patch2: Patch1: f1: ProbeB');
              expect(f2('ProbeA')).toBe('Patch4: Patch2: Patch1: f2: ProbeA');
              expect(f2('ProbeB')).toBe('Patch4: Patch2: Patch1: f2: ProbeB');
            });

            describe('REMOVE Patch 1 & 4 ... using array', () => {
              
              before( function() {
                myCreator.patchCreatedFnsClear( [patchId1, patchId4] );
              });
              
              it('extension tests', () => {
                expect(f1('ProbeA')).toBe('Patch2: f1: ProbeA');
                expect(f1('ProbeB')).toBe('Patch2: f1: ProbeB');
                expect(f2('ProbeA')).toBe('Patch2: f2: ProbeA');
                expect(f2('ProbeB')).toBe('Patch2: f2: ProbeB');
              });

              describe('CLEAR AL Patches', () => {
                
                before( function() {
                  myCreator.patchCreatedFnsClear();
                });
                
                it('extension tests', () => {
                  expect(f1('ProbeA')).toBe('f1: ProbeA');
                  expect(f1('ProbeB')).toBe('f1: ProbeB');
                  expect(f2('ProbeA')).toBe('f2: ProbeA');
                  expect(f2('ProbeB')).toBe('f2: ProbeB');
                });

              });

            });

          });

        });

      });

    });

  });

});
