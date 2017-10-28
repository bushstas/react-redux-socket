import {List, Map as ImmutableMap} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote, getWinners} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('преобразует в immutable', () => {
      const state = ImmutableMap();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(ImmutableMap({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

  });

  describe('далее', () => {

    it('берёт для голосования следующие две записи', () => {
      const state = ImmutableMap({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(ImmutableMap({
        vote: ImmutableMap({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

  });

  describe('vote', () => {


it('создаёт результат голосования для выбранной записи', () => {
    const state = ImmutableMap ({
      pair: List.of('Trainspotting', '28 Days Later')
    });
    const nextState = vote(state, 'Trainspotting')
    expect(nextState).to.equal(ImmutableMap ({
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: ImmutableMap ({
        'Trainspotting': 1
      })
    }));
  });

  it('добавляет в уже имеющийся результат для выбранной записи', () => {
    const state = ImmutableMap ({
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: ImmutableMap ({
        'Trainspotting': 3,
        '28 Days Later': 2
      })
    });
    const nextState = vote(state, 'Trainspotting');
    expect(nextState).to.equal(ImmutableMap ({
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: ImmutableMap ({
        'Trainspotting': 4,
        '28 Days Later': 2
      })
    }));
  });


it('помещает победителя текущего голосования в конец списка записей', () => {
    const state = ImmutableMap({
      vote: ImmutableMap({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: ImmutableMap({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }),
      entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);

    expect(nextState).to.equal(ImmutableMap({
      vote: ImmutableMap({
        pair: List.of('Sunshine', 'Millions')
      }),
      entries: List.of('127 Hours', 'Trainspotting')
    }));
  });


it('в случае ничьей помещает обе записи в конец списка', () => {
    const state = ImmutableMap({
      vote: ImmutableMap({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: ImmutableMap({
          'Trainspotting': 3,
          '28 Days Later': 3
        })
      }),
      entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);
    expect(nextState).to.equal(ImmutableMap({
      vote: ImmutableMap({
        pair: List.of('Sunshine', 'Millions')
      }),
      entries: List.of('127 Hours','Trainspotting', '28 Days Later')
    }));
  });

it('когда остаётся лишь одна запись, помечает её как победителя', () => {
    const state = ImmutableMap({
      vote: ImmutableMap({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: ImmutableMap({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }),
      entries: List()
    });
    const nextState = next(state);
    expect(nextState).to.equal(ImmutableMap({
      winner: 'Trainspotting'
    }));
  });



  });

});