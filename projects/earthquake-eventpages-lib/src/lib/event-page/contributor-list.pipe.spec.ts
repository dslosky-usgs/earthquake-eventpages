import { Event } from '../event';
import { ContributorListPipe } from './contributor-list.pipe';

describe('ContributorListPipe', () => {
  let details, event, pipe;

  beforeEach(() => {
    pipe = new ContributorListPipe();
    event = new Event({
      properties: {
        sources: ',bb,a,'
      }
    });
    details = [
      {
        aliases: null,
        id: 'a',
        title: 'A Title',
        url: 'a-url'
      },
      {
        aliases: ['bb'],
        id: 'b',
        title: 'B Title',
        url: 'b-url'
      }
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms with no detailsMap', () => {
    const result = pipe.transform(event);

    expect(result).toEqual('<li>A</li><li>BB</li>');
  });

  it('transforms with a detailsMap', () => {
    const result = pipe.transform(event, details);
    expect(result).toEqual(
      '<li><a href="a-url">A ' +
        'Title</a></li><li><a href="b-url">B Title</a></li>'
    );
  });

  it('transforms no sources', () => {
    const result = pipe.transform(null);
    expect(result).toEqual('');
  });

  it('gracefully handles no sources', () => {
    delete event.sources;
    const result = pipe.transform(event);
    expect(result).toBe('');
  });
});
