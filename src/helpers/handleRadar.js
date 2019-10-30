import throttle from 'lodash/throttle';

import { radar, activeSector } from "../store";
/* директива get нужна для получения текущего значения хранилища без подписки на само хранилище */
import { get } from "svelte/store";

export default function handleRadar(node) {
  const getRadarElementAtPoint = e => {
        /* определяем тип события: касание или мышь */ 
    const event = e.touches ? e.touches[0] : e;
    const element = document.elementFromPoint(event.pageX, event.pageY);
        /* получаем имя и значение сектора из html разметки */
    const score = element.getAttribute("value");
    const id = element.getAttribute("name");
    return { id, score, type: event.type };
  };
  const start = e => {
        /* получаем элемент радара из активного сектора */
    const { id } = getRadarElementAtPoint(e);
        /* устанавливаем текущий активный сектор */
    activeSector.set(id);
  };
  const end = () => {
        /* сбрасываем активный сектор */
    activeSector.set(null);
  };
  const move = e => {
        /* тротлинг через requestAnimationFrame поможет избежать лагов при активном перемещении */
    window.requestAnimationFrame(() => {
      const { id, score, type } = getRadarElementAtPoint(e);
            /* проверяем, что у нас есть активный сектор, т.е. движение началось внутри радара, и это не клик */
      if (!id || (id !== get(activeSector) && type !== "click") || !score) return;
            /* обновляем состояние радара */
      radar.set(id, score);
    });
  };

  const throttledMove = throttle(move, 100);

  /* регистрируем обработчики */
  node.addEventListener("mousedown", start);
  node.addEventListener("touchstart", start);
  node.addEventListener("mouseup", end);
  node.addEventListener("touchend", end);
  node.addEventListener("mousemove", throttledMove);
  node.addEventListener("touchmove", throttledMove);
  node.addEventListener("touch", throttledMove);
  node.addEventListener("click", throttledMove);

    /* возвращаем объект с функцией destroy, которая произведет отписку от событий при удалении компонента из DOM */
  return {
    destroy: () => {
      node.removeEventListener("mousedown", start);
      node.removeEventListener("touchstart", start);
      node.removeEventListener("mouseup", end);
      node.removeEventListener("touchend", end);
      node.removeEventListener("mousemove", throttledMove);
      node.removeEventListener("touchmove", throttledMove);
      node.removeEventListener("touch", throttledMove);
      node.removeEventListener("click", throttledMove);
    }
  };
}