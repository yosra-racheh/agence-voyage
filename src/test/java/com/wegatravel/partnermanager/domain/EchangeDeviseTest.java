package com.wegatravel.partnermanager.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wegatravel.partnermanager.web.rest.TestUtil;

public class EchangeDeviseTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EchangeDevise.class);
        EchangeDevise echangeDevise1 = new EchangeDevise();
        echangeDevise1.setId(1L);
        EchangeDevise echangeDevise2 = new EchangeDevise();
        echangeDevise2.setId(echangeDevise1.getId());
        assertThat(echangeDevise1).isEqualTo(echangeDevise2);
        echangeDevise2.setId(2L);
        assertThat(echangeDevise1).isNotEqualTo(echangeDevise2);
        echangeDevise1.setId(null);
        assertThat(echangeDevise1).isNotEqualTo(echangeDevise2);
    }
}
